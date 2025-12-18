import { clerkClient } from "@clerk/express";


export const auth = async (req, res, next) => {
    try {
        // Clerk's requireAuth() middleware already sets up req.auth
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const userId = req.auth.userId;
        const has = req.auth.has;
        
        if (!has) {
            // If has is not available, assume free plan
            req.plan = 'free';
            req.free_usage = 0;
            return next();
        }

        const hasPremiumPlan = await has({plan: 'premium'});
        
        try {
            const user = await clerkClient.users.getUser(userId);

            if(!hasPremiumPlan && user.privateMetadata?.free_usage){
                req.free_usage = user.privateMetadata.free_usage
            }else{
                await clerkClient.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        free_usage:0
                    }
                })
                req.free_usage = 0;
            } 
        } catch(metadataError) {
            // If metadata fetch fails, just continue without it
            req.free_usage = 0;
        }
        
        req.plan = hasPremiumPlan ? 'premium' :'free';
        next()
        } catch (error){
            console.error('[Auth Middleware] Error:', error.message);
            res.status(500).json({success: false, message: error.message})
    }
}
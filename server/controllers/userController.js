import dotenv from "dotenv";
dotenv.config();


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvrzozbenqpsoqpoumkx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        
    const { data, error } = await supabase
  .from('creations')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
  if(error){
    console.log('Error fetching creations:', error.message);
    return res.json({ success: false, message: error.message });
  }
        
    
        res.json({ success: true, creations: data || [] });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}



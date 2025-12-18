import dotenv from "dotenv";
dotenv.config();


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvrzozbenqpsoqpoumkx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const getUserCreations = async (req, res) => {
    try {
        const userId = req.auth.userId;
        
        if (!userId) {
            console.error('[getUserCreations] No userId found in req.auth');
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        console.log('[getUserCreations] Fetching creations for userId:', userId);
        
    const { data, error } = await supabase
  .from('creations')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
  
  if(error){
    console.log('[getUserCreations] Supabase error:', error.message);
    return res.json({ success: false, message: error.message });
  }
  
        console.log('[getUserCreations] Successfully fetched', data?.length || 0, 'creations');
        res.json({ success: true, creations: data || [] });
    } catch (error) {
        console.error('[getUserCreations] Catch error:', error.message, error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const completeWorkout = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { workoutPlanName, totalCalories, duration } = req.body;

        if (!workoutPlanName || typeof totalCalories !== 'number') {
            return res.json({ success: false, message: 'Missing workoutPlanName or totalCalories' });
        }

        

        
        const { data: workoutData, error: workoutError } = await supabase
            .from('workouts')
            .insert([
                {
                    user_id: userId,
                    calories: totalCalories,
                    workout: 1
                }
            ]);

        if (workoutError) {
            console.log('Error saving workout:', workoutError.message);
            return res.json({ success: false, message: workoutError.message });
        }

        res.json({ success: true, message: 'Workout completed and saved successfully' });
    } catch (error) {
        console.log('[completeWorkout] Error:', error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getWorkoutStats = async (req, res) => {
    try {
        const userId = req.auth.userId;

        if (!userId) {
            console.error('[getWorkoutStats] No userId found');
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        console.log('[getWorkoutStats] Fetching stats for userId:', userId);

        // Fetch all workouts for this user and aggregate the data
        const { data: workouts, error } = await supabase
            .from('workouts')
            .select('calories, workout')
            .eq('user_id', userId);

        if (error) {
            console.log('[getWorkoutStats] Supabase error:', error.message);
            return res.json({ success: false, message: error.message });
        }

        // Calculate totals from the workouts
        let totalCalories = 0;
        let totalWorkouts = 0;

        if (workouts && workouts.length > 0) {
            workouts.forEach(record => {
                totalCalories += record.calories || 0;
                totalWorkouts += record.workout || 0;
            });
        }

        console.log('[getWorkoutStats] Returning stats - workouts:', totalWorkouts, 'calories:', totalCalories);
        
        res.json({ 
            success: true, 
            stats: {
                totalWorkouts,
                totalCalories
            }
        });
    } catch (error) {
        console.error('[getWorkoutStats] Catch error:', error.message, error);
        res.status(500).json({ success: false, message: error.message });
    }



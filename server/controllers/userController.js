import dotenv from "dotenv";
dotenv.config();


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvrzozbenqpsoqpoumkx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const getUserCreations = async (req, res) => {
    try {
        const userId = req.auth.userId;
        
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


        // Fetch all workouts for this user and aggregate the data
        const { data: workouts, error } = await supabase
            .from('workouts')
            .select('calories, workout')
            .eq('user_id', userId);

        if (error) {
            console.log('Error fetching workouts:', error.message);
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

        
        res.json({ 
            success: true, 
            stats: {
                totalWorkouts,
                totalCalories
            }
        });
    } catch (error) {
        console.log('[getWorkoutStats] Error:', error.message);
        res.json({ success: false, message: error.message });
    }
}



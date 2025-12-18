import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import fullbody from '../assets/plans/full_body.jpg';
import chest from '../assets/plans/chest.jpg';
import arms from '../assets/plans/arms.jpeg';
import back from '../assets/plans/back.jpeg';
import cardio from '../assets/plans/cardio.jpeg';
import abs from '../assets/plans/abs.jpeg';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const WorkoutPlans = () => {
const { getToken } = useAuth();
const [selectedPlan, setSelectedPlan] = useState(null);
const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
const [completedExercises, setCompletedExercises] = useState([]);
const [timeLeft, setTimeLeft] = useState(0);
const [isTimerActive, setIsTimerActive] = useState(false);
const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
const [workoutStartTime, setWorkoutStartTime] = useState(null);

const workoutPlans = {
    fullBody: {
        name: 'Full Body',
        image: `${fullbody}`,
        exercises: [
            { name: 'Push-ups', duration: 30, calories: 8 },
            { name: 'Pull-ups', duration: 30, calories: 10 },
            { name: 'Shoulder Press', duration: 30, calories: 9 },
            { name: 'Bicep Curls', duration: 30, calories: 7 },
            { name: 'Squats', duration: 45, calories: 12 },
            { name: 'Plank', duration: 45, calories: 6 },
            { name: 'Lunges', duration: 30, calories: 9 }
        ]
    },
    chest: {
        name: 'Chest',
        image: `${chest}`,
        exercises: [
            { name: 'Bench Press', duration: 40, calories: 11 },
            { name: 'Push-ups', duration: 35, calories: 8 },
            { name: 'Chest Fly', duration: 30, calories: 9 },
            { name: 'Incline Press', duration: 35, calories: 10 },
            { name: 'Cable Crossover', duration: 30, calories: 8 },
            { name: 'Dumbbell Press', duration: 40, calories: 11 }
        ]
    },
    arms: {
        name: 'Arms',
        image: `${arms}`,
        exercises: [
            { name: 'Bicep Curls', duration: 30, calories: 7 },
            { name: 'Tricep Dips', duration: 35, calories: 9 },
            { name: 'Arm Circles', duration: 20, calories: 4 },
            { name: 'Hammer Curls', duration: 30, calories: 7 },
            { name: 'Overhead Extension', duration: 30, calories: 8 },
            { name: 'Lateral Raises', duration: 30, calories: 6 }
        ]
    },
    back: {
        name: 'Back',
        image: `${back}`,
        exercises: [
            { name: 'Pull-ups', duration: 35, calories: 10 },
            { name: 'Rows', duration: 40, calories: 11 },
            { name: 'Lat Pulldown', duration: 30, calories: 9 },
            { name: 'Deadlifts', duration: 40, calories: 13 },
            { name: 'Back Extension', duration: 30, calories: 8 },
            { name: 'Face Pulls', duration: 30, calories: 7 }
        ]
    },
    cardio: {
        name: 'Cardio',
        image: `${cardio}`,
        exercises: [
            { name: 'Jumping Jacks', duration: 45, calories: 8 },
            { name: 'Burpees', duration: 40, calories: 12 },
            { name: 'High Knees', duration: 45, calories: 10 },
            { name: 'Jump Rope', duration: 45, calories: 11 },
            { name: 'Mountain Climbers', duration: 40, calories: 10 },
            { name: 'Running in Place', duration: 50, calories: 9 }
        ]
    },
    Abs: {
        name: 'Abs',
        image: `${abs}`,
        exercises: [
            { name: 'Crunches', duration: 30, calories: 5 },
            { name: 'Leg Raises', duration: 30, calories: 7 },
            { name: 'Russian Twists', duration: 35, calories: 6 },
            { name: 'Bicycle Crunches', duration: 30, calories: 6 },
            { name: 'Plank', duration: 45, calories: 6 },
            { name: 'Ab Wheel Rollout', duration: 30, calories: 8 }
        ]
    }
};

useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
        interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isTimerActive && timeLeft === 0) {
        // Timer reached zero — treat as exercise completion
        setIsTimerActive(false);
        completeExercise();
    }
    return () => clearInterval(interval);
}, [isTimerActive, timeLeft]);

const startPlan = (planKey) => {
    setSelectedPlan(planKey);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setTotalCaloriesBurned(0);
    setWorkoutStartTime(Date.now());
    setTimeLeft(workoutPlans[planKey].exercises[0].duration);
};

const startExercise = () => {
    setIsTimerActive(true);
};

const completeExercise = () => {
    // Add current exercise to completed list using functional update
    setCompletedExercises(prev => [...prev, currentExerciseIndex]);
    
    // Add calories from this exercise
    const planExercises = workoutPlans[selectedPlan].exercises;
    const currentExerciseCalories = planExercises[currentExerciseIndex].calories;
    setTotalCaloriesBurned(prev => prev + currentExerciseCalories);
    
    setIsTimerActive(false);

    const isLast = currentExerciseIndex >= planExercises.length - 1;

    if (!isLast) {
        // Move to next exercise
        setCurrentExerciseIndex(idx => idx + 1);
        // set next exercise time using functional read of current index
        setTimeLeft(() => {
            const nextIndex = currentExerciseIndex + 1;
            return planExercises[nextIndex].duration;
        });
    } else {
        // Completed the entire plan — save to database then reset
        saveWorkoutCompletion(planExercises);
    }
};

const saveWorkoutCompletion = async (planExercises) => {
    try {
        const token = await getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const planName = workoutPlans[selectedPlan].name;
        const workoutDurationSeconds = Math.round((Date.now() - workoutStartTime) / 1000);
        
        console.log(`[WorkoutPlans] Saving workout: ${planName}, calories: ${totalCaloriesBurned}, duration: ${workoutDurationSeconds}s`);
        
        const { data } = await axios.post('/api/user/complete-workout', {
            workoutPlanName: planName,
            totalCalories: totalCaloriesBurned,
            duration: workoutDurationSeconds
        }, { headers });

        if (data.success) {
            toast.success('Workout saved! 🎉');
            console.log('[WorkoutPlans] Workout saved successfully');
        } else {
            toast.error(data.message || 'Failed to save workout');
            console.warn('[WorkoutPlans] Workout save failed:', data.message);
        }
    } catch (error) {
        console.error('[WorkoutPlans] Error saving workout:', error);
        toast.error('Error saving workout to database');
    }
    
    // Reset after a short delay
    setTimeout(() => {
        resetPlan();
    }, 800);
};



const resetPlan = () => {
    setSelectedPlan(null);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setTotalCaloriesBurned(0);
    setWorkoutStartTime(null);
    setTimeLeft(0);
    setIsTimerActive(false);
};

const progress = selectedPlan ? (completedExercises.length / workoutPlans[selectedPlan].exercises.length) * 100 : 0;

if (selectedPlan) {
    const plan = workoutPlans[selectedPlan];
    const currentExercise = plan.exercises[currentExerciseIndex];
    return (
        <div className='bg-slate-900 h-[calc(100vh-56px)] text-white p-6'>
            <button onClick={resetPlan} className='mb-4 px-4 py-2 bg-red-600 rounded'>Back</button>
            <h1 className='text-4xl font-bold mb-4'>{plan.name} Workout</h1>
            <div className='mb-6'>
                <div className='w-full bg-slate-700 rounded-full h-4'>
                    <div className='bg-green-500 h-4 rounded-full' style={{width: `${progress}%`}}></div>
                </div>
                <p className='mt-2'>Progress: {completedExercises.length}/{plan.exercises.length}</p>
            </div>
            <div className='bg-slate-800 p-6 rounded-lg'>
                <h2 className='text-3xl font-bold mb-4'>{currentExercise.name}</h2>
                <p className='text-sm text-slate-400 mb-4'>Calories: {currentExercise.calories} kcal | Total Burned: {totalCaloriesBurned} kcal</p>
                <div className='text-6xl font-bold text-center mb-4'>{timeLeft}s</div>
                <div className='flex gap-4 justify-center'>
                    <button onClick={startExercise} disabled={isTimerActive} className='px-6 py-2 bg-green-600 rounded disabled:opacity-50'>Start</button>
                    <button onClick={completeExercise} className='px-6 py-2 bg-blue-600 rounded'>Mark Done</button>
                </div>
            </div>
        </div>
    );
}

return (
    <div className='bg-slate-900 h-[calc(100vh-56px)] text-white p-6 overflow-y-scroll'>
        <h1 className='text-4xl font-bold mb-4'>Workout Plans</h1>
        <p className='text-slate-400 mb-8'>Select a workout plan to get started:</p>
        <div className='grid grid-cols-2 gap-5'>
            {Object.entries(workoutPlans).map(([key, plan]) => (
                <button key={key} onClick={() => startPlan(key)} className='p-4 bg-slate-800 hover:bg-slate-700 border border-gray-300 rounded-lg'>
                    <div className='flex justify-center items-center gap-6 px-10'>
                    <div>
                        <h3 className='text-xl font-bold'>{plan.name}</h3>
                        <p className='text-sm text-slate-400'>{plan.exercises.length} exercises</p>
                    </div>
                    <img src={plan.image} alt={plan.name} className='mt-2 h-40 w-60 object-cover rounded-md'/>
                    </div>
                    
                </button>
            ))}
        </div>
    </div>
);
}

export default WorkoutPlans
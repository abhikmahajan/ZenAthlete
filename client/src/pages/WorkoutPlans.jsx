import React from 'react'
import { useState, useEffect } from 'react';
import fullbody from '../assets/plans/full_body.jpg';
import chest from '../assets/plans/chest.jpg';
import arms from '../assets/plans/arms.jpeg';
import back from '../assets/plans/back.jpeg';
import cardio from '../assets/plans/cardio.jpeg';
import abs from '../assets/plans/abs.jpeg';

const WorkoutPlans = () => {
const [selectedPlan, setSelectedPlan] = useState(null);
const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
const [completedExercises, setCompletedExercises] = useState([]);
const [timeLeft, setTimeLeft] = useState(0);
const [isTimerActive, setIsTimerActive] = useState(false);

const workoutPlans = {
    fullBody: {
        name: 'Full Body',
        image: `${fullbody}`,
        exercises: [
            { name: 'Push-ups', duration: 30 },
            { name: 'Squats', duration: 30 },
            { name: 'Plank', duration: 45 },
            { name: 'Lunges', duration: 30 }
        ]
    },
    chest: {
        name: 'Chest',
        image: `${chest}`,
        exercises: [
            { name: 'Bench Press', duration: 30 },
            { name: 'Push-ups', duration: 30 },
            { name: 'Chest Fly', duration: 30 }
        ]
    },
    arms: {
        name: 'Arms',
        image: `${arms}`,
        exercises: [
            { name: 'Bicep Curls', duration: 30 },
            { name: 'Tricep Dips', duration: 30 },
            { name: 'Arm Circles', duration: 30 }
        ]
    },
    back: {
        name: 'Back',
        image: `${back}`,
        exercises: [
            { name: 'Pull-ups', duration: 30 },
            { name: 'Rows', duration: 30 },
            { name: 'Lat Pulldown', duration: 30 }
        ]
    },
    cardio: {
        name: 'Cardio',
        image: `${cardio}`,
        exercises: [
            { name: 'Jumping Jacks', duration: 30 },
            { name: 'Burpees', duration: 30 },
            { name: 'High Knees', duration: 30 }
        ]
    },
    Abs: {
        name: 'Abs',
        image: `${abs}`,
        exercises: [
            { name: 'Jumping Jacks', duration: 30 },
            { name: 'Burpees', duration: 30 },
            { name: 'High Knees', duration: 30 }
        ]
    }
};

useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
        interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isTimerActive) {
        setIsTimerActive(false);
    }
    return () => clearInterval(interval);
}, [isTimerActive, timeLeft]);

const startPlan = (planKey) => {
    setSelectedPlan(planKey);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setTimeLeft(workoutPlans[planKey].exercises[0].duration);
};

const startExercise = () => {
    setIsTimerActive(true);
};

const completeExercise = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    setIsTimerActive(false);
    if (currentExerciseIndex < workoutPlans[selectedPlan].exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setTimeLeft(workoutPlans[selectedPlan].exercises[currentExerciseIndex + 1].duration);
    }
};

const skipExercise = () => {
    setIsTimerActive(false);
    if (currentExerciseIndex < workoutPlans[selectedPlan].exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setTimeLeft(workoutPlans[selectedPlan].exercises[currentExerciseIndex + 1].duration);
    }
};

const resetPlan = () => {
    setSelectedPlan(null);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
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
                <div className='text-6xl font-bold text-center mb-4'>{timeLeft}s</div>
                <div className='flex gap-4 justify-center'>
                    <button onClick={startExercise} disabled={isTimerActive} className='px-6 py-2 bg-green-600 rounded disabled:opacity-50'>Start</button>
                    <button onClick={completeExercise} className='px-6 py-2 bg-blue-600 rounded'>Mark Done</button>
                    <button onClick={skipExercise} className='px-6 py-2 bg-yellow-600 rounded'>Skip</button>
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
                <button key={key} onClick={() => startPlan(key)} className='p-4 bg-slate-800 hover:bg-slate-700 rounded-lg'>
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
import React from 'react'
import BMICalculator from '../components/BMICalculator';

const WorkoutSplit = () => {
  return (
    <div className='bg-slate-900 h-[calc(100vh-56px)] p-6 text-white overflow-y-scroll'>
        <h1 className='text-4xl font-bold mb-4'>Workout Split</h1>
        <p className='text-slate-400 mb-8'>Get a Workout Schedule according to your BMI.</p>
        <BMICalculator />
    </div>
  )
}

export default WorkoutSplit
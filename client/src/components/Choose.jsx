import React from 'react'
import { Activity, Dumbbell, Gauge } from 'lucide-react'

const Choose = () => {
  return (
    
        <div className='bg-black text-slate-100 py-20 h-screen flex justify-center flex-col'>
        <h1 className='flex justify-center items-center text-4xl font-semibold mb-14'>Why Choose ZenAthlete?</h1>

        <div className='grid grid-cols-3 gap-10 max-w-6xl mx-auto'>
          <div className='bg-zinc-900 p-8 rounded-xl hover:scale-105 transition-transform duration-150 hover:border '>
            <Dumbbell className='h-8 w-8'/>
            <h1 className='mt-4 text-2xl font-semibold mb-6 '>Personalized Fitness Plans</h1>
            <p className='text-gray-200'>Get workouts tailored uniquely for your goals, physique, and experience level.</p>
          </div>
          <div className='bg-zinc-900 p-8 rounded-xl hover:scale-105 transition-transform duration-150 hover:border '>
            <Activity className='h-8 w-8'/>
            <h1 className='mt-4 text-2xl font-semibold mb-6 '>Real-time Progress Tracking</h1>
            <p className='text-gray-200'>Track your daily exercise stats, calorie burn, and weekly improvements.</p>
          </div>
          <div className='bg-zinc-900 p-8 rounded-xl hover:scale-105 transition-transform duration-150 hover:border '>
            <Gauge className='h-8 w-8'/>
            <h1 className='mt-4 text-2xl font-semibold mb-6 '>Adaptive Schedule System</h1>
            <p className='text-gray-200'>Your routine updates automatically as your performance evolves.</p>
          </div>
        </div>
      </div>
    
  )
}

export default Choose
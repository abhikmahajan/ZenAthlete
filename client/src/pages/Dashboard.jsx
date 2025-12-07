import { Check, Gem, Sparkles, SquareActivity } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import CreationItem from '../components/CreationItem';
import { useNavigate } from 'react-router-dom'
import { Protect, useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const Dashboard = () => {


   const [creations, setCreations] = useState([])
   const [workoutStats, setWorkoutStats] = useState({ totalWorkouts: 0, totalCalories: 0 })
   const {getToken} = useAuth()
   

const getDashboardData = async () => {
    try {
      // Fetch creations
      const creationsResponse = await axios.get('/api/user/creations')
      if(creationsResponse.data.success){
        setCreations(creationsResponse.data.creations)
      }else{
        toast.error(creationsResponse.data.message)
      }

      // Fetch workout stats
      const statsResponse = await axios.get('/api/user/workout-stats')
      if(statsResponse.data.success){
        setWorkoutStats(statsResponse.data.stats)
      }else{
        toast.error(statsResponse.data.message)
      }
    } catch (error) {
      console.error('[Dashboard] Error fetching data:', error);
      toast.error(error.message)
    }
  }

   useEffect(()=>{
      getDashboardData()
    },[])


  const navigate = useNavigate();

  return (
    <div>
        <div className="h-[calc(100vh-56px)] bg-slate-900  p-6 overflow-y-scroll">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to ZenAthlete</h1>
            <p className="text-slate-400">Track your fitness journey and achieve your goals</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
            {/* grid 1 */}
            <div className="bg-slate-700 rounded-lg p-6 text-white border border-gray-300 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm mb-2">Calories Burned</p>
                <p className="text-2xl font-bold">{workoutStats.totalCalories.toLocaleString()} kcal</p>
              </div>
              <div className='w-10 h-10 rounded-lg bg-linear-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <SquareActivity className='w-5 text-white'/>
          </div>
            </div>


            {/* grid 2 */}
            <div className="bg-slate-700 rounded-lg p-6 text-white border border-gray-300 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm mb-2">Workouts Completed</p>
                <p className="text-2xl font-bold">{workoutStats.totalWorkouts}</p>
              </div>
              <div className='w-10 h-10 rounded-lg bg-linear-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Check className='w-5 text-white'/>
          </div>
            </div>

            {/* grid 3 */}
            <div className="bg-slate-700 rounded-lg p-6 text-white border border-gray-300 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm mb-2">Created Plans and Diets</p>
                <p className="text-2xl font-bold">{creations.length}</p>
              </div>
              <div className='w-10 h-10 rounded-lg bg-linear-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
            </div>

            {/* grid 4 */}
            <div className="bg-slate-700 rounded-lg p-6 text-white border border-gray-300 flex justify-between items-center">
              <div>
              <p className="text-slate-400 text-sm mb-2">Current Plan</p>
              <div className='text-2xl font-bold'>
                <Protect plan='premium' fallback='Free'>Premium</Protect>Plan
              </div>
              </div>
              <div className='w-10 h-10 rounded-lg bg-linear-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white'/>
          </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Workout */}
            <div className="lg:col-span-2 bg-slate-700 rounded-lg p-6 text-white h-full border border-gray-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">Created Plans <span className='text-lg text-zinc-300'>(Workout and Nutrition)</span></h2>
              <div className="space-y-3">
                {
        creations.map((item)=> <CreationItem key={item.id} item={item} />)
      }

              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-700 rounded-lg p-6 text-white border border-gray-300 max-h-72">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button onClick={()=>navigate('/gym/workout-plans')} className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold cursor-pointer">
                  Start Workout
                </button>
                <button onClick={()=>navigate('/gym/nutrition')} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold cursor-pointer">
                  Get Nutrition Plan
                </button>
                <button onClick={()=>navigate('/gym/coach-support')} className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold cursor-pointer">
                  Contact Coach
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
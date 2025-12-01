import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div className="h-[calc(100vh-56px)] bg-slate-900  p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to ZenAthlete</h1>
            <p className="text-slate-400">Track your fitness journey and achieve your goals</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-700 rounded-lg p-6 text-white">
              <p className="text-slate-400 text-sm mb-2">Calories Burned</p>
              <p className="text-3xl font-bold">1,245 kcal</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-white">
              <p className="text-slate-400 text-sm mb-2">Workouts This Week</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-white">
              <p className="text-slate-400 text-sm mb-2">Steps Today</p>
              <p className="text-3xl font-bold">8,432</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-white">
              <p className="text-slate-400 text-sm mb-2">Streak Days</p>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Workout */}
            <div className="lg:col-span-2 bg-slate-700 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Today's Workout</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                  <span>Running - 5km</span>
                  <span className="text-green-400">✓ Completed</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                  <span>Strength Training - 45 min</span>
                  <span className="text-yellow-400">In Progress</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-600 rounded">
                  <span>Yoga - 30 min</span>
                  <span className="text-slate-400">Pending</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-700 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">
                  Start Workout
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold">
                  Log Meal
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold">
                  View Progress
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
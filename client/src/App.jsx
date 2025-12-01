import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard' 
import Layout from './pages/Layout'
import WorkoutPlans from './pages/WorkoutPlans'
import Nutrition from './pages/Nutrition'
import WorkoutSplit from './pages/WorkoutSplit'
import Coach from './pages/Coach'
import PersonalPlans from './pages/PersonalPlans'

function App() {
  return (
    <>
    <Toaster />
    
      
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/gym' element={<Layout/>} >
          <Route index element={<Dashboard/>} />
          <Route path='workout-plans' element={<WorkoutPlans/>} />
          <Route path='workout-split' element={<WorkoutSplit/>} />
          <Route path='personalised-plans' element={<PersonalPlans/>} />
          <Route path='nutrition' element={<Nutrition/>} />
          <Route path='coach-support' element={<Coach/>} />
        </Route>
      </Routes>
    
    </>
  )
}

export default App

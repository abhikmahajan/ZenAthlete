import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import {SignIn, useUser } from '@clerk/clerk-react'
import favicon from '../assets/zen_favicon.png'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen bg-black'>
      <nav className='w-full px-8 min-h-14 flex items-center gap-5 border-b border-gray-200'>
        <img className='cursor-pointer w-10 ' src={favicon} alt='logo' onClick={() => navigate('/')}/>
        <h1 className='font-bold text-2xl text-white'>ZenAthlete</h1>
      
       {
        sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/> :
         <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
       } 
       </nav>
       <div className='h-[calc(100vh-64px)] flex-1 w-full lg:flex'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#82858a]'>
          <Outlet />  
        </div>
       </div>   
    </div>
  ) : (
    <div className='flex justify-center items-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout
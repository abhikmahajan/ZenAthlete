import React from 'react'
import {useUser, useClerk, Protect } from '@clerk/clerk-react'
import { Notebook, FileText, Dumbbell, House, LogOut, Salad, SquarePen, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {to:'/gym', label: 'Dashboard', Icon: House},
  {to:'/gym/workout-plans', label: 'Workout Plans', Icon: SquarePen},
  {to:'/gym/workout-split', label: 'Workout Split', Icon: Dumbbell},
  {to:'/gym/personalised-plans', label: 'Personalised Plans', Icon: Notebook},
  {to:'/gym/nutrition', label: 'Nutrition', Icon: Salad},
  {to:'/gym/coach-support', label: 'Coach Support', Icon: FileText},
]

const Sidebar = ({sidebar, setSidebar}) => {
    const {user} = useUser()
    const {signOut, openUserProfile} = useClerk()

    return (
        <>
    
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 sm:hidden ${
          sidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebar(false)}
      />
      
    <div className={`w-56 bg-black text-white border-r border-gray-200 flex flex-col justify-between items-center sm:relative max-sm:fixed max-sm:z-50  bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
        <div className='my-7 w-full'>
            <img src={user.imageUrl} alt='User avatar' className='w-13 rounded-full border-2 mx-auto'/>
            <h1 className='mt-1 text-center'>{user.fullName}</h1>
            <div className='px-6 mt-5 text-sm text-gray-300 font-medium'>
              {navItems.map(({to,label,Icon}) => (
                <NavLink key={to} to={to} end={to==='/gym'} onClick={()=>setSidebar(false)} className={({isActive}) => `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}` }>
                  {({isActive})=>(
                    <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                    {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
        </div>

        <div className='w-full text-white border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
              <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
                <img src={user.imageUrl} className='w-8 rounded-full' alt=''/>
                <div>
                  <h1 className='text-sm font-medium'>{user.fullName}</h1>
                  <p className='text-xs text-gray-500'>
                    <Protect plan='premium' fallback='Free'>Premium</Protect>Plan
                  </p>
                </div>
              </div>
              <LogOut onClick={signOut}  className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
        </div>
    </div>
    </>
  )
}

export default Sidebar
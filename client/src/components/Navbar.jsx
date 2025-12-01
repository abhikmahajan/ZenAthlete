import React from 'react'
import logo from '../assets/zen_logo.png'
import { ArrowRight } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

export default function Navbar() {

    const {user} = useUser();
    const {openSignIn} = useClerk();

  return (
    <>
    <div className='fixed top-0 z-5 w-full backdrop-blur-2xl'>
    <div className='flex  h-16 text-white mx-auto justify-between items-center px-10'>
      <div className='flex items-center gap-4 px-6  font-semibold text-2xl'>
        <img src={logo} alt='Logo' className='h-10 w-10'/>
        <h1>ZenAthlete</h1>
      </div>
      <div>
        {
          user ? <UserButton/> : (
          <button onClick={openSignIn} className='flex gap-2 rounded-xl transition-transform bg-black p-2 px-3 hover:scale-105'>Get Started<ArrowRight/></button>
        )
        }
        
      </div>
      </div>
      </div>
    </>
  )
}




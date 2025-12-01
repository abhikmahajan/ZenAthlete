import React from 'react'
import logo from '../assets/zen_logo.png'

export const Main = () => {
  return (
    <div className='bg-gradient-to-r from-black via-white to-black h-screen flex flex-col items-center justify-center'>
      <div className='mb-12 animate-fade-in'>
        <img 
          src={logo} 
          alt="Zen Athlete Logo" 
          className='h-100 mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className='text-center px-8'>
        <h1 className='text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-blue-900 to-blue-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse'>
          The way to a perfect body
        </h1>
        <p className='text-white text-xl mt-6 opacity-90 font-light tracking-wide'>
          Transform your fitness journey today
        </p>
      </div>
    </div>
  )
}

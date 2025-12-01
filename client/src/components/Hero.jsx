import React from 'react'
import user_group from '../assets/user_group.png'
import image from '../assets/zen_landing.jpg'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className='transition-transform duration-300 ease-in-out'>
        <div className='min-h-screen absolute  w-full'>
        <img src={image} alt="Zen Athlete" className='w-full h-screen '/>
    </div>
    <div className='relative text-white flex flex-col justify-center items-center min-h-screen '>
      <h1 className='text-7xl transition-transform font-semibold mb-5 hover:scale-105'>Zen Athlete</h1>
      <p className='mb-14 text-xl text-gray-300 '>Your personalized fitness companion with tailored training schedules.</p>
      
      <div className='flex gap-4'>
        <button className='bg-white text-black transition-transform border flex text-center gap-2 justify-center p-3 rounded-2xl px-6 hover:scale-105'>Start creating now</button>
        <button className='bg-black text-white transition-transform border flex text-center gap-2 justify-center p-3 rounded-2xl px-6 hover:scale-105'>Watch Demo</button>
 
      </div>
      
      <div className='flex items-center gap-4 mt-8 mx-auto text-white'>
                  <img src={user_group} alt='' className='h-8'/>Trusted by 10k+ people
        </div>
    </div>
    </div>
  )
}

export default Hero
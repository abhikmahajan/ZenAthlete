import React from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Choose from '../components/Choose'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'

const Landing = () => {


  return (
    <>
    <Navbar/>
    <Hero/>
    <Choose />
    <Testimonial/>
    <Plan/>
    <Footer/>
    </>
  )
}

export default Landing
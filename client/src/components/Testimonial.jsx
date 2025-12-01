import React from 'react'
import star_icon from '../assets/star_icon.svg'
import star_dull_icon from '../assets/star_dull_icon.svg'

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Fitness Coach, FitLife Academy',
            content: 'ZenAthlete transformed my fitness journey. The personalized workout plans and tracking features helped me achieve my goals faster than I ever thought possible!',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Marathon Runner, Elite Sports',
            content: 'I gained incredible strength and endurance using ZenAthlete. The community support and expert guidance made all the difference in my fitness progress.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Fitness Enthusiast, Gym Instructor',
            content: 'ZenAthlete helped me get fit and maintain consistent progress. The app is intuitive and the results speak for themselves. I\'ve never felt stronger!',
            rating: 4,
        },
    ]

    return (
        <div className='bg-black  sm:px-20 xl:px-32 py-24'>
            <div className='text-center'>
                <h2 className='text-slate-100 text-[42px] font-semibold'>Loved by Athletes</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg  bg-zinc-900 shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_, index) => (<img key={index} src={index < testimonial.rating ? star_icon : star_dull_icon} className="w-4 h-4" alt="star"/>))}
                        </div>
                        <p className='text-gray-200 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-300'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-200'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Testimonial
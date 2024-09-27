import React from 'react'
import imageOne from "../images/CarouselImage1.jpg"
import imageTwo from "../images/CarouselImage2.jpg"
import imageThree from "../images//CarouselImage3.jpg"
import { Link } from 'react-router-dom'
import Carousel from '../components/EmployerComponents/Carousel' 
import { BadgeDollarSign, TrendingUp, User } from 'lucide-react'
import employeePic from "../images/employee.jpg"
import employerPic from "../images/employer.jpg"
import { Quote } from 'lucide-react'

const EmployerPage = () => {
  const slides = [imageOne, imageTwo, imageThree]

  const benefits = [
    {
      description: "Recruit and develop a highly-skilled workforce that helps grow their business.",
      icon: TrendingUp,
      color: "#023e8a",
    },
    {
      description: "Minimize liability costs through appropriate training of workers.",
      icon: BadgeDollarSign,
      color: "#023e8a",
    },
    {
      description: "Create flexible training options that ensure workers develop the right skills.",
      icon: User,
      color: "#023e8a",
    },
  ]

  const testimonials = [
    {
      quote: "Indeed's platform is so easy to use. We've hired about 35-40 people on Indeed in the past two years",
      name: "Flint Beamon",
      position: "Founder/COO",
      company: "Barkin' Creek",
      image: employeePic,
    },
    {
      quote: "The Big Apple Apprentice Portal has transformed our hiring process. We've found exceptional talent through their platform.",
      name: "Carmen Santos",
      position: "HR Director",
      company: "TechInnovate Inc.",
      image: employerPic,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative">
  
      <Carousel autoSlide={true}>
          {[...slides.map((s) => (
            <img src={s}  />
          ))]}
        </Carousel> 

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Empower Your Workforce</h1>
            <p className="text-xl md:text-2xl mb-8">Discover the power of apprenticeships for your business</p>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16 px-10 bg-white'>
        <div className="container mx-auto px-4 text-center">
          <h2 className='text-3xl font-bold text-yellow-600 mb-6'>Benefits of Apprenticeships for Employers</h2>
          <p className='text-lg text-gray-700 mb-8'>With a network of over 150,000 employers in more than 1,000 occupations, apprenticeship is developing a new generation of workers to help our nation succeed in the 21st-century economy.</p>
          <p className='text-xl font-semibold text-gray-800 mb-12'>Apprenticeship programs help employers:</p>
          
          <div className='flex justify-center gap-8 w-full'>
            {benefits.map((benefit, index) => (
              <div key={index} className='bg-white rounded-lg shadow-xl p-8 max-w-sm w-full flex flex-col items-center transform transition duration-500 hover:scale-105'>
                <benefit.icon className='w-20 h-20 text-blue-900 mb-6'/>
                <p className='text-gray-800 text-lg'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-blue-50'>
        <div className="container mx-auto px-4 text-center">
          <h2 className='text-3xl font-bold text-yellow-700 mb-12'>Hear from Our Employers</h2>
          
          <div className="space-y-16 flex items-center flex-col ">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`w-9/12 flex flex-col md:flex-row items-center rounded-lg ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} bg-white shadow-xl overflow-hidden`}>
                <div className="md:w-1/3">
                  <img src={testimonial.image} alt={testimonial.name} className='w-80 h-64 p-3'/>
                </div>
                <div className="md:w-2/3 p-8 text-left">
                  <Quote className="w-12 h-12 text-blue-500 mb-4" />
                  <p className='text-2xl mb-6 text-gray-800 italic'>{testimonial.quote}</p>
                  <div>
                    <p className='text-lg font-semibold text-gray-900'>{testimonial.name}</p>
                    <p className='text-gray-600'>{testimonial.position}</p>
                    <p className='text-gray-600'>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-900 py-16 text-white text-center border-b border-blue-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
          <p className="text-xl mb-8">Join The Big Apple Apprentice Portal and start hiring skilled apprentices today.</p>
          <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )}
   


export default EmployerPage
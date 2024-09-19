import React from 'react'
import imageOne from "../assets/CarouselImage1.jpg"
import imageTwo from "../assets/CarouselImage2.jpg"
import imageThree from "../assets/CarouselImage3.jpg"
import { Link } from 'react-router-dom'
import Carousel from '../components/EmployerComponents/Carousel' 
import { BadgeDollarSign, TrendingUp, User } from 'lucide-react'
import employeePic from "../assets/employee.jpg"
import employerPic from "../assets/employer.jpg"
import { Quote } from 'lucide-react'

const EmployerPage = () => {

  const slides = [
    imageOne,
    imageTwo,
    imageThree,
  ]
  
  const reasons = [
    {
      description: "Recruit and develop a highly-skilled workforce that helps grow their business. ",
      icon:"<BadgeDollarSign className='h-16 w-16'/>",
      color:"#023e8a",
      },
    {
    description: "Minimize liability costs through appropriate training of workers ",
    icon:"<Users className='h-16 w-16'/>",
    color:"#023e8a",
    },
   
    {
    description: "Minimize liability costs through appropriate training of workers ",
    icon:"<BadgeDollarSign className='h-16 w-16'/>",
    color:"#023e8a",
    },
]
  return (
    <>
      <section className="bg-gray-100">
      <Carousel autoSlide={true}>
          {[...slides.map((s) => (
            <img src={s}  />
          ))]}
        </Carousel> 

      </section>
    
      <section className='bg-gray-200 py-10'>
        <div className="container mx-auto px-4 text-center">
        
            <h1 className='text-3xl font-bold text-gray-900 mb-6'> What are the benefits of apprenticeships for employers?</h1>
            <p className='text-lg text-gray-700 mb-8'>With a network of over 150,000 employers in more than 1,000 occupations, apprenticeship is developing a new generation of workers to help our nation succeed in the 21st-century economy.</p>
            <p className='text-lg text-gray-700 mb-8'>Apprenticeship programs help employers: </p>
         
            <div className='flex flex-wrap justify-center'>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <TrendingUp className='w-16 h-16 text-[#023e8a]'/>
                  <p> Recruit and develop a highly-skilled workforce that helps grow their business.
                  </p>
                </div>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <BadgeDollarSign className='w-16 h-16 text-[#023e8a]'/>
                  <p className='p-4'>Minimize liability costs through appropriate training of workers </p>
                </div>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <User className='w-16 h-16 text-[#023e8a]'/>
                  <p> Create flexible training options that ensure workers develop the right skills 
                  </p>
                </div>
          
          
       </div>
      </div>
    </section>

      <section className='bg-gray-200 py-10  flex flex-col  items-center'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6 p-8'> Hear our employers </h1>

        <div className="container mx-auto flex items-center ">
            <img src={employeePic} alt="career seeker image" className=' w-50 h-50 rounded-full mx-auto mb-4'></img>
            <div className='text-left w-8/12 pl-10'>
            <p className='text-3xl mb-8 text-orange-700 font-bold  italic'> <span><Quote style={{ transform: `translateX(rotate: 90deg)` }} /></span> Indeed’s platform is so easy to use. We’ve hired about 35-40 people on Indeed in the past two years" </p> 
            <p className='text-lg text-gray-700 mb-8 font-sans'>Flint Beamon, Founder/COO </p>
            <p className='text-lg text-gray-700 mb-8 leading-3'>Barkin' Creek </p>
            </div>
         </div>
    </section>
    
    
    </>
  )
}

export default EmployerPage
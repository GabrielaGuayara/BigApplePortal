import React from 'react'
import employeePic from "../../images/employee.jpg"
import employerPic from "../../images/employer.jpg"
import {Link} from "react-router-dom"

const InfoSection = () => {
  return (
    <>
    <section className='bg-sky-200 py-10'>
        <div className="container mx-auto px-4 flex justify-around text-center">
        <div className='flex-1 mb-8 lg:mb-0'>
            <h2 className='uppercase font-bold text-xl lg:text-2xl text-gray-800 mb-3'>Become an Apprentice</h2> 
            <h2 className='uppercase font-semibold text-gray-600 mb-3 text-lg'>I'm a Carrer Seeker</h2> 
            <img src={employeePic} alt="career seeker image" className=' w-50 h-50 rounded-full mx-auto mb-4'></img>
            <button className="mt-3 bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 transition duration-300 rounded">
           <Link to="/login"> GET STARTED</Link>
            </button>
        </div>


        <div className='flex-1 mb-8 lg:mb-0 '>
            <h2  className='uppercase font-bold text-xl lg:text-2xl text-gray-800 mb-3'>Star a program</h2> 
            <h2  className='uppercase font-semibold text-gray-600 mb-3 text-lg'>I'm an employer</h2> 
            <img src={employerPic} className='w-50 h-50 rounded-full mx-auto mb-4'></img>
            <button className="mt-3 bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 transition duration-300 rounded">
            <Link to="/welcome-employers"> GET STARTED</Link>
            </button>
        </div>

</div>

</section>


    </>
  )
}

export default InfoSection

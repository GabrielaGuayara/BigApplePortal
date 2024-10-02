import React from 'react';
import { Briefcase, GraduationCap, DollarSign, Clock } from 'lucide-react';
import CarouselImage3 from "../images/CarouselImage3.jpg";
import { Link } from "react-router-dom";
import employeePic from "../images/employee.jpg";
import employerPic from "../images/employer.jpg";
import ApiService from '../Service/ApiService';

const Home = () => {

  const isEmployee = ApiService.isEmployee()

  return (
    <div className="min-h-screen">
      <header className="text-blue bg-no-repeat bg-cover bg-center bg-fixed h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${CarouselImage3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top'
        }}>
        <div className='bg-white bg-opacity-80 w-full max-w-4xl p-8 rounded-xl text-center transform transition-all duration-500 hover:scale-105 hover:bg-opacity-90'>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue">Welcome to The Big Apple Apprentice Portal</h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo">Kickstart your career with hands-on learning opportunities</p>
        {isEmployee ?
          <Link to="/opportunities" className="bg-yellow hover:bg-yellow-600 text-blue font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Explore Opportunities
        </Link>
        :
        <Link to="/login" className="bg-yellow hover:bg-yellow-600 text-blue font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Explore Opportunities
        </Link>

        }
        </div>
      </header>
      <section className='bg-cream py-16'>
        <div className="container mx-auto px-4 text-center">
          <h2 className='text-3xl font-bold text-blue mb-8'>Why Choose The Big Apple Apprentice Portal?</h2>
          <div className='flex flex-wrap justify-center'>
            {[
              { icon: Briefcase, title: "Real-World Experience", description: "Gain practical skills in your chosen field" },
              { icon: GraduationCap, title: "Learn While You Earn", description: "Get paid as you develop your professional expertise" },
              { icon: DollarSign, title: "No Student Debt", description: "Avoid the burden of traditional education costs" },
              { icon: Clock, title: "Fast-Track Your Career", description: "Accelerate your professional growth" }
            ].map((benefit, index) => (
              <div key={index} className=' bg-white rounded-xl p-6 m-4 max-w-sm w-full flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:bg-blue-700'>
                <benefit.icon className='w-16 h-16 text-yellow mb-4' />
                <h3 className='text-xl font-semibold text-cerulean mb-2'>{benefit.title}</h3>
                <p className='text-cerulean'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='bg-indigo py-16'>
        <div className="container mx-auto px-4 text-center">
          <h2 className='text-3xl font-bold text-cream mb-6'>Kickstart your career today! </h2>
          <p className='text-xl text-white mb-12'>Create an acoount and start applying</p>
          <Link to="/login" className="bg-yellow hover:bg-yellow-600 text-blue font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Sign Up
          </Link>
        </div>
      </section>

      <section className='bg-blue py-16'>
        <div className="container mx-auto px-4 flex flex-wrap justify-around text-center">
          <div
            className='flex-1 mb-8 lg:mb-0 max-w-sm mx-4 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105'
          
          >
            <div className='p-6'>
              <h2 className='uppercase font-bold text-2xl text-blue mb-3'>Become an Apprentice</h2>
              <h3 className='uppercase font-semibold text-indigo mb-3 text-lg'>I'm a Career Seeker</h3>
              <div className='relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full'>
                <img src={employeePic} alt="career seeker" className='w-full h-full object-cover transition-transform duration-500 transform hover:scale-110' />
                
              </div>
              <Link to="/login" className="mt-3 inline-block bg-blue hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                GET STARTED
              </Link>
            </div>
          </div>

          <div
            className='flex-1 mb-8 lg:mb-0 max-w-sm mx-4 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105'
           
          >
            <div className='p-6 '>
              <h2 className='uppercase font-bold text-2xl text-blue mb-3'>Start a Program</h2>
              <h3 className='uppercase font-semibold text-indigo mb-3 text-lg'>I'm an Employer</h3>
              <div className='relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full'>
                <img src={employerPic} alt="employer" className='w-full h-full object-cover transition-transform duration-500 transform hover:scale-110' />
              
              </div>
              <Link to="/welcome-employers" className="mt-3 inline-block bg-blue hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </section>

     
     
    </div>
  );
};

export default Home;

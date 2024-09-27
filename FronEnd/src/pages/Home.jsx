import React, { useState } from 'react';
import { BadgeDollarSign, TrendingUp, User } from 'lucide-react'
import CarouselImage3 from "../images/CarouselImage3.jpg"
import InfoSection from '../components/EmployerComponents/InfoSection';

const Home = () => {
  const [apprenticeshipSeachResults, setApprenticeshipResults] = useState([]);

  return (
    <div className="min-h-screen">
      <header className="text-[#24282C] bg-no-repeat bg-cover bg-top bg-fixed h-screen flex flex-start"
       style={{backgroundImage: `url(${CarouselImage3})`,}}
      
      >
        <div className='bg-slate-50 w-fit p-2 bg-opacity-50 rounded-xl text-center m-auto'>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Welcome to The Big Apple Apprentice Portal</h1>
          <p className="text-xl mb-8">Kickstart your career with hands-on learning opportunities</p>
        </div>
      </header>    
      <InfoSection/>
     
    
      <section className='bg-gray-200 py-10'>
        <div className="container mx-auto px-4 text-center">
        
            <h1 className='text-3xl font-bold text-gray-900 mb-6'>How to start</h1>
            <p className='text-lg text-gray-700 mb-8'>Search apprenticeship that meets your goals </p>
         
            <div className='flex flex-wrap justify-center'>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <TrendingUp className='w-16 h-16 text-[#023e8a]'/>
                  <p> Go to opportunities page and check all the opportunities we have
                  </p>
                </div>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <BadgeDollarSign className='w-16 h-16 text-[#023e8a]'/>
                  <p className='p-4'>Create an account and apply </p>
                </div>
                <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full flex flex-col items-center'>
                  <User className='w-16 h-16 text-[#023e8a]'/>
                  <p> Update your profile and wait for an employer to contact you 
                  </p>
                </div>
          
          
       </div>
      </div>
    </section>
    </div>
  );
};

export default Home;

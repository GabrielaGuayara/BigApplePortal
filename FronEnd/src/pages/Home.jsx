import React, { useState } from 'react';
import ApprenticeshipSearch from '../components/apprenticeshipComponents/ApprenticeshipSearch';
import ApprenticeshipCard from '../components/apprenticeshipComponents/apprenticeshipCard';
import InfoSection from '../components/EmployerComponents/InfoSection';

const Home = () => {
  const [apprenticeshipSeachResults, setApprenticeshipResults] = useState([]);

  const handleSearchResult = (results) => {
    setApprenticeshipResults(results);
  };

  return (
    <div className="min-h-screen">
      <header className="text-[#24282C] bg-[url('./assets/jobs.jpg')] bg-no-repeat bg-cover bg-top bg-fixed h-screen flex flex-start">
        <div className='bg-slate-50 w-fit p-2 bg-opacity-50 rounded-xl text-center m-auto'>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Welcome to The Big Apple Apprentice Portal</h1>
          <p className="text-xl mb-8">Kickstart your career with hands-on learning opportunities</p>
        </div>
      </header>

      <section>
      <h2 className="text-3xl font-bold text-[#0A1128] mb-8">Available Apprenticeships</h2>
      <div className="container mx-auto px-4 py-16 text-center flex flex-col">
        <ApprenticeshipSearch handleSearchResult={handleSearchResult} />
        <ApprenticeshipCard apprenticeshipSeachResults={apprenticeshipSeachResults} />
      </div>
      </section>
      <InfoSection/>
    </div>
  );
};

export default Home;

import React from 'react'
import ApprenticeshipSearch from '../components/apprenticeshipComponents/ApprenticeshipSearch'

const ApprenticeshipDisplay = () => {
  return (
    <>
    <section className='text-center p-10 '>
    <h2 className="text-3xl font-bold text-yellow-600 mb-8">Available Apprenticeships</h2>

    <div className='flex  flex-col w-full justify-center space-x-4'>
        <ApprenticeshipSearch/>
      </div>
    </section>
    </>
  )
}

export default ApprenticeshipDisplay

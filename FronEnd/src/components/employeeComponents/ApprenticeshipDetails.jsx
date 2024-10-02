import React from 'react'
import { BuildingOffice2Icon, MapPinIcon, AcademicCapIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ApprenticeshipDetails = ({ apprenticeship, handleApply, showModal, setShowModal, message }) => {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
       {!apprenticeship ?
          <p>No apprenticeships found</p>
        :
        <>
        <div className="p-6">
        <h2 className="text-3xl font-bold text-blue mb-2">{apprenticeship.title}</h2>
        <div className="flex items-center text-indigo">
          <BuildingOffice2Icon className="h-6 w-6 mr-2" />
          <span className="text-xl">{apprenticeship.company}</span>
        </div>
        <p className="mt-2 text-indigo">Posted on: {new Date(apprenticeship.datePosted).toLocaleDateString()}</p>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-indigo mb-2">Description</h3>
          <p className="text-black">{apprenticeship.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center">
            <AcademicCapIcon className="h-6 w-6 text-yellow mr-2" />
            <span className="text-indigo">{apprenticeship.educationLevel}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 text-yellow mr-2" />
            <span className="text-indigo">{apprenticeship.apprenticeshipType}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-6 w-6 text-yellow mr-2" />
            <span className="text-indigo">{apprenticeship.location}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-6 w-6 text-yellow mr-2" />
            <span className="text-indigo">{apprenticeship.salaryRange}</span>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-indigo mb-2">Required Skills</h4>
          <ul className="list-disc list-inside text-black">
          {/* Since requiredSkills is an array. It is possible to map their objects and then place each object in a list item */}
            {apprenticeship.requiredSkills ? (
              apprenticeship.requiredSkills.split(',').map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))
            ) : (
              <li>No skills required</li>
            )}
          </ul>
        </div>

        <div className="flex items-center mb-6">
          {apprenticeship.status === 'OPEN' ? (
            <CheckCircleIcon className="h-6 w-6 text-cerulean mr-2" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red mr-2" />
          )}
          <span className={`text-lg font-semibold ${apprenticeship.status === 'OPEN' ? 'text-cerulean' : 'text-red'}`}>
            Status: {apprenticeship.status}
          </span>
        </div>
        <button
          onClick={handleApply}
          className="w-full bg-cerulean hover:bg-indigo text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-opacity-50"
         
        >
          APPLY NOW
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-blue bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cerulean bg-opacity-20">
                <CheckCircleIcon className="h-6 w-6 text-cerulean" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-indigo mt-4">Application Successful!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-black">{message}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-cerulean hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
       }
      </div>
    );
  };

export default ApprenticeshipDetails


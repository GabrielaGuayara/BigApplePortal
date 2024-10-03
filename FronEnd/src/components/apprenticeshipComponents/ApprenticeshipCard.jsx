import React from 'react';
import { CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ApprenticeshipCard = ({ apprenticeship, onApply }) => {
  return (
    <div className="bg-white rounded-lg flex shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border-2 border-yellow w-full sm:w-80 md:w-72 lg:w-80">
      <div className="w-full p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue">{apprenticeship.title}</h2>
          <div className="space-y-2">
            <div className="flex items-center text-blue">
              <img src={apprenticeship.logoURL} alt={apprenticeship.company} className="w-8 h-8 object-contain rounded-lg mr-2" />
              <span className="font-semibold">{apprenticeship.company}</span>
            </div>
            <div className="flex items-center text-blue">
              <MapPinIcon className="h-5 w-5 mr-2 text-red" />
              <span>{apprenticeship.location}</span>
            </div>
            <div className="flex items-center text-blue">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-red" />
              <span>{apprenticeship.salaryRange}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onApply}
          className="mt-4 w-full bg-blue hover:bg-indigo text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
        >
         See More Details
        </button>
      </div>
    </div>
  );
};

export default ApprenticeshipCard;

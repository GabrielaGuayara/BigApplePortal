import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase } from 'lucide-react';

const ApprenticeshipCard = ({ apprenticeshipSearchResults = [] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apprenticeshipSearchResults.length > 0 ? (
        apprenticeshipSearchResults.map((apprenticeship) => (
          <div key={apprenticeship.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{apprenticeship.title}</h3>
              <div className="flex items-center mb-2">
                <MapPin className="text-gray-400 mr-2" size={16} />
                <span className="text-sm text-gray-500">{apprenticeship.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <DollarSign className="text-gray-400 mr-2" size={16} />
                <span className="text-sm text-gray-500">{apprenticeship.salary}</span>
              </div>
              <div className="flex items-center mb-4">
                <Briefcase className="text-gray-400 mr-2" size={16} />
                <span className="text-sm text-gray-500">{apprenticeship.category}</span>
              </div>
              <p className="text-gray-600 mb-4">{apprenticeship.description}</p>
              <Link
                to={`/apply/${apprenticeship.id}`}
                className="block w-full bg-[#1C3879] hover:bg-[#2B4F9A] text-white text-center px-4 py-2 rounded transition-colors duration-200"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No apprenticeships found</p>
      )}
    </div>
  );
};

export default ApprenticeshipCard;

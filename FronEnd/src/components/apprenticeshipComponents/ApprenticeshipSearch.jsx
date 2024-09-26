import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { BuildingOffice2Icon, CurrencyDollarIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { LocateIcon, LocateOffIcon, MapIcon, MapPin } from 'lucide-react';

import {Aperture, Search} from "lucide-react"
import ApiService from '../../Service/ApiService';
const ApprenticeshipSearch = ({ handleSearchResult }) => {
  const [apprenticeships, setApprenticeships] = useState([]);
  const [filteredTerm, setFilteredTerm] = useState('');
  const isEmployee = ApiService.isEmployee();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprenticeships = async () => {
      try {
        const response = await ApiService.getAllApprenticeships();
        console.log(response.apprenticeships)
        setApprenticeships(response.apprenticeships);
        setFilteredTerm(response.apprenticeships)
        
    } catch (error) {
        console.error(error);
    }
    };
    fetchApprenticeships();
  }, []);

  const handleSearch = (e) => {
    setFilteredTerm(
        apprenticeships.filter(apprenticeship =>
            apprenticeship.title && apprenticeship.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
    );
}
  return (
    <>
    

      <div className='flex w-full justify-center space-x-4'>
        <div className='flex justify-center items-center'>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search for apprenticeships..."
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        {/* <div>
          <select
            value={borough}
            onChange={e => setBorough(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Boroughs</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="Bronx">Bronx</option>
            <option value="Staten Island">Staten Island</option>
          </select>
        </div> */}
      </div>

      <div className='flex flex-wrap justify-center'>
    {apprenticeships.length === 0 ? (
        <p>No apprenticeships found.</p>
    ) : (
        filteredTerm.map(apprenticeship => (
            <div key={apprenticeship.id} className="p-4 border border-gray-300 rounded-lg mb-4 w-80 m-10 shadow-lg ">
                <h2 className="text-xl font-semibold mb-4  text-blue-700 text-center ">{apprenticeship.title}</h2>
                <div className='flex mb-2  text-center'>
                <BuildingOffice2Icon className='w-8 mr-3 text-yellow-500'/> {apprenticeship.apprenticeshipType}
                </div>
                <div className='flex mb-2 items-center '>
                <MapPin className='mr-3 text-yellow-500'/> {apprenticeship.location}
                </div>
                <div className='flex mb-2 items-center '>
                <CurrencyDollarIcon className='w-8 text-yellow-500 mr-3'/>{apprenticeship.salaryRange}
                </div>
                    

                {
                    isEmployee ?
                    <button
                        onClick={() => navigate(`/employee/individual-apprenticeship-page/${apprenticeship.id}`)}
                        className="inline-block mt-2 bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200">Apply
                    </button>
                    :
                    <Link
                        to="/login"
                        className="inline-block mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200">Apply</Link>
                }
            </div>
        ))
    )}
</div>
<div className="text-center mt-12">
    <Link
        to="/opportunities"
        className="inline-block bg-[#1C3879] hover:bg-[#2B4F9A] text-white px-6 py-3 rounded-full transition-colors duration-200"
    >
        View All Opportunities
    </Link>
</div>

    </>
  );
};

export default ApprenticeshipSearch;



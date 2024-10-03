import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import ApiService from '../../Service/ApiService';
import ApprenticeshipCard from './ApprenticeshipCard';


export default function ApprenticeshipSearch() {

  //States to holds apprenticeships. filteredApprenitceships and filters 
  const [apprenticeships, setApprenticeships] = useState([]);
  const [filteredApprenticeships, setFilteredApprenticeships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //State to manage the state of selected borough and salaryRange
  const [filters, setFilters] = useState({
    selectedBorough: '',
    selectedSalaryRange: ''
  })

  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  //useEffect to fetch apprenticeship from the API when component mounts
  useEffect(() => {
    const fetchApprenticeships = async () => {
      try {
        const response = await ApiService.getAllApprenticeships();
        setApprenticeships(response.apprenticeships);
        console.log(response.apprenticeships)
        setFilteredApprenticeships(response.apprenticeships);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApprenticeships();
  }, []);

  //UseEffect to filter apprenticeships based on seach and selected criteria
  useEffect(() => {
    const filtered = apprenticeships.filter(apprenticeship => 
      apprenticeship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.selectedBorough === '' || apprenticeship.location === filters.selectedBorough) &&
      (filters.selectedSalaryRange === '' || apprenticeship.salaryRange === filters.selectedSalaryRange)
    );
    setFilteredApprenticeships(filtered);
  }, [searchTerm, filters, apprenticeships]);

  const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];
  const salaryRanges = ['$20 - $25 per hour', '$18 - $22 per hour', '$15 - $20 per hour'];

  //Function to hangle change on filters
 const handleFilterChange = (e) =>{
    const {name, value} = e.target;
    setFilters(prevFilters =>({
      ...prevFilters,
      [name] : value
    }))
  }
  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        
        <h1 className="text-4xl font-bold text-blue mb-8 text-center">Find Your Perfect Apprenticeship</h1>
        
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search apprenticeships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue focus:outline-none focus:border-yellow"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-cerulean" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue text-white rounded-full hover:bg-indigo transition-colors duration-300"
          >  
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        
        </div>

        {showFilters && (
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <select
              value={filters.selectedBorough}
              name='selectedBorough'
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-full border-2 border-cerulean focus:outline-none focus:border-yellow"
            >
              <option value="">All Boroughs</option>
              {boroughs.map(borough => (
                <option key={borough} value={borough}>{borough}</option>
              ))}
            </select>
            <select
              value={filters.selectedSalaryRange}
              name='selectedSalaryRange'
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-full border-2 border-cerulean focus:outline-none focus:border-yellow"
            >
              <option value="">All Salary Ranges</option>
              {salaryRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {filteredApprenticeships.length === 0 ? (
            <p className="text-center col-span-full text-lg text-indigo">No apprenticeships found.</p>
          ) : (
            filteredApprenticeships.map(apprenticeship => (
             <ApprenticeshipCard
             key={apprenticeship.id}
             apprenticeship={apprenticeship}
             onApply={()=> navigate(`/employee/individual-apprenticeship-page/${apprenticeship.id}`)}
             
             />
            ))
          )}
        </div>
      </div>
    </div>
  );
}



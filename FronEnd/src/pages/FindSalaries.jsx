import React, { useState, useEffect } from 'react'
import salaries from '../data/salaries.js'
import { BuildingOffice2Icon, CurrencyDollarIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/solid'

const FindSalaries =()=> {

  //State vaiables to manage search input, filtered salaries, selected boroughs and selected salary range
  const [search, setSearch] = useState('')
  const [filteredSalaries, setFilteredSalaries] = useState(salaries)
  const [filters, setFilters] = useState({
    selectedBorough: '',
    selectedSalaryRange:''
  })
 
  const [showFilters, setShowFilters] = useState(false)

  //Setting boroughs and salaries ranges that will be used for filtering
  const boroughs = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const salaryRanges = ['$20 - $25 per hour', '$18 - $22 per hour', '$15 - $20 per hour']

  //This useEffect will run again everytime the search, selected borough and selectedSalaryRange change
  useEffect(() => {
    const filtered = salaries.filter(salary => 
      salary.title.toLowerCase().includes(search.toLowerCase()) &&
      (filters.selectedBorough === '' || salary.location === filters.selectedBorough) &&
      (filters.selectedSalaryRange === '' || salary.salary === filters.selectedSalaryRange)
    )
    setFilteredSalaries(filtered)
  }, [search, filters])


const  handleFilterChange = (e) =>{
    const {name, value} = e.target;
    setFilters(prevFilters =>({
      ...prevFilters,
      [name] : value
    }))
  }
  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue mb-8 text-center">Find Salaries</h1>
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search salaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue focus:outline-none focus:border-blue-700"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
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
              className="px-4 py-2 rounded-full border-2 border-blue-500 focus:outline-none focus:border-blue-700"
            >
              <option value="">All Boroughs</option>
              {boroughs.map(borough => (
                <option key={borough} value={borough}>{borough}</option>
              ))}
            </select>
            <select
              value={filters.selectedSalaryRange}
              name = "selectedSalaryRange"
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-full border-2 border-blue-500 focus:outline-none focus:border-blue-700"
            >
              <option value="">All Salary Ranges</option>
              {salaryRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-wrap justify-center">
          {filteredSalaries.length === 0 ? (
            <p className="text-center col-span-full text-lg text-blue-700">No salaries found.</p>
          ) : (
            filteredSalaries.map((salary) => (
              <div key={salary.id} className="p-6 m-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white w-72 border-2 border-yellow">
                <h2 className="text-xl font-semibold mb-4 text-blue">{salary.title}</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <BuildingOffice2Icon className="h-5 w-5 mr-2 text-yellow-500" />
                    <span>{salary.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    <span>{salary.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    <span>{salary.salary}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default  FindSalaries;
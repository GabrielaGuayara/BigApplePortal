import React, { useState } from 'react'
import salaries from '../data/salaries.js'
import { CurrencyDollarIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';

console.log(salaries)
const FindSalaries = () => {

  const [search, setSearch] = useState('');

  return (    
    <>
      <form className="max-w-lg mx-auto">
          <div className="flex mt-20">
              
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              
              </div>
              <div className="relative w-full">
                  <input type="search" id="search-dropdown" className=" p-4 block w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search by Borough" required 
                  onChange={(e) => setSearch(e.target.value)}
                  
                  />
                  <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                
                <MagnifyingGlassCircleIcon className='w-5'/>

                      <span className="sr-only">Search</span>
                  </button>
              </div>
          </div>
      </form>
      <div className='flex flex-wrap justify-center'>
      {
        salaries.filter((salary) =>{
          {
            return search.toLowerCase() === "" ? salary : salary.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          }
        }).map((salary) =>{
          return (
        <>
        <div className="p-6 border border-sky-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white m-5 w-60">
          
          <h2 className="text-2xl font-semibold ">{salary.title}</h2>
          
            <p className="text-gray-700">{salary.description}</p>
            <p className="text-gray-700">Company: {salary.company}</p>
            <p className="text-gray-700">Location: {salary.location}</p>
            <p  className="text-xl font-semibold flex">
              <spa><CurrencyDollarIcon className='w-8'/></spa>{salary.salary}
            </p>
        </div>  
        </>

        )})
        
        
        }

        </div>
      

    </>
  )
}

export default FindSalaries;

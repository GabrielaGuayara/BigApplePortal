import React from 'react';
import { Link } from 'react-router-dom';

const EmployerTable = () => {
  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden">
      <Link to="/admin/add-new-category">
        <button className='btn w-fit mx-10 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out'>
          + Add a new apprenticeship category
        </button>
      </Link>
      <div className='flex justify-center p-5'>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {['John Brown', 'Jim Green', 'Joe Black'].map((name, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{Math.floor(Math.random() * 50)}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="inline-flex items-center gap-x-2 text-sm font-semibold text-red-600 hover:text-red-800 transition duration-300 ease-in-out">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
  )}
export default EmployerTable

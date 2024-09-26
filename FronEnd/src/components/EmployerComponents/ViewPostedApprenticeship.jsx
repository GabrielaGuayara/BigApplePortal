import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService';

const ViewPostedApprenticeships = () => {
    const [apprenticeships, setApprenticeships] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('id'); // Get userId from local storage

    useEffect(() => {
        const fetchApprenticeships = async () => {
            try {
                const response = await ApiService.getAllApprenticeshipsByUser(userId);
                setApprenticeships(response.apprenticeships);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchApprenticeships();
    }, [userId]);

    const handleDelete = async (apprenticeshipId) => {
        try {
            await ApiService.deleteApprenticeship(apprenticeshipId, userId);
            setApprenticeships(apprenticeships.filter(app => app.id !== apprenticeshipId));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    const handleEdit = (apprenticeship) => {
        // Navigate to edit page or open a modal for editing
        console.log('Edit apprenticeship:', apprenticeship);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
              {error && <div className="text-red-500 mb-4">{error}</div>}
            <table min-w-full divide-y divide-gray-200>
                <thead className='min-w-full divide-y divide-gray-200 font-bold'> Posted Apprenticeships
                    <tr className='border bottom-1'>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200">
                    {apprenticeships.map(apprenticeship => (
                    <tr key={apprenticeship.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 border border-1">{apprenticeship.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 border border-1">{apprenticeship.location}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium border border-1">{apprenticeship.status}</td>
                        <td className='border border-1'>
                        <button
                                onClick={() => handleEdit(apprenticeship)}
                                className="text-blue-500 hover:underline m-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(apprenticeship.id)}
                                className="text-red-500 hover:underline m-4"
                            >
                                Delete
                            </button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
        
          
            {/* <ul>
                {apprenticeships.map(apprenticeship => (
                    <li key={apprenticeship.id} className="border-b border-gray-300 py-4">
                        <h3 className="text-lg font-semibold">{apprenticeship.title}</h3>
                        <p>{apprenticeship.description}</p>
                        <p className="text-gray-600">Location: {apprenticeship.location}</p>
                        <p className="text-gray-600">Status: {apprenticeship.status}</p>
                        <div className="flex space-x-4 mt-2">
                            
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default ViewPostedApprenticeships;




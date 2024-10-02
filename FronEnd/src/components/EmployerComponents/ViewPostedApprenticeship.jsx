import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, CheckCircle, Eye } from 'lucide-react'; 

const ViewPostedApprenticeships = () => {
    const [apprenticeships, setApprenticeships] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

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

    const handleChangeStatus = async (apprenticeshipId) => {
        const newStatus = prompt("Enter new status (e.g., OPEN, CLOSED, IN_PROGRESS):");
        if (newStatus) {
            try {
                await ApiService.updateApprenticeship(apprenticeshipId, { status: newStatus });
                setApprenticeships(apprenticeships.map(app => 
                    app.id === apprenticeshipId ? { ...app, status: newStatus } : app
                ));
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md ">
            {error && <div className="text-red mb-4 text-sm">{error}</div>}
            <table className="min-w-full text-center">
                <thead className='bg-indigo'>
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">View Applicants</th>
                    </tr>
                </thead>
                <tbody className='bg-cream text-center'>
                    {apprenticeships.map(apprenticeship => (
                        <tr key={apprenticeship.id}>
                            <td className="px-4 py-2 text-xs font-medium text-gray-800">{apprenticeship.title}</td>
                            <td className="px-4 py-2 text-xs text-gray-800">{apprenticeship.location}</td>
                            <td className="px-4 py-2 text-right text-xs font-medium">{apprenticeship.status}</td>
                            <td className='flex space-x-2 py-2'>
                                <button
                                    onClick={() => handleChangeStatus(apprenticeship.id)}
                                    className="flex items-center text-green-500 hover:text-green-600 text-xs"
                                >
                                    <CheckCircle className="mr-1" size={16} /> Change Status
                                </button>
                                
                                <button
                                    onClick={() => handleDelete(apprenticeship.id)}
                                    className="flex items-center text-red-500 hover:text-red-600 text-xs"
                                >
                                    <Trash2 className="mr-1" size={16} /> Delete
                                </button>
                            </td>
                            <td className='py-2'>
                                <button className='flex items-center text-blue-600 hover:underline text-xs'
                                    onClick={() => navigate(`/employer/view-applicants/${apprenticeship.id}`)}
                                >
                                    <Eye className="mr-1" size={16} /> View Applicants
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPostedApprenticeships;

import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewPostedApprenticeships = () => {

    //State to manage apprenticeship
    const [apprenticeships, setApprenticeships] = useState([]);
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    //Effect to fetch appprenticeships by id
    useEffect(() => {
        const fetchApprenticeships = async () => {
            try {
                const response = await ApiService.getAllApprenticeshipsByUser(userId);
                setApprenticeships(response.apprenticeships);
            } catch (error) {
               console.error(e)
            }
        };

        fetchApprenticeships();
    }, [userId]);

    //Function to manage apprenticeship deletion
    const handleDelete = async (apprenticeshipId) => {
        try {
           const response = await ApiService.deleteApprenticeship(apprenticeshipId, userId);
            setApprenticeships(apprenticeships.filter(app => app.id !== apprenticeshipId));
            if(response.ok){
                toast.sucess('Apprenticeship successfully deleted')
            }
        } catch (error) {
           toast.error("Error deleting apprenticeship")
            console.error(e)
        }
    };

    const handleChangeStatus = async (apprenticeshipId) => {
        const newStatus = prompt("Enter new status (e.g., OPEN, CLOSED, IN_PROGRESS):");
        if (newStatus) {
            try {
                await ApiService.updateApprenticeship(apprenticeshipId, { status: newStatus });
                setApprenticeships(apprenticeships.map(apprenticeship => 
                    apprenticeship.id === apprenticeshipId ? { ...apprenticeship, status: newStatus } : apprenticeship
                ));
            } catch (error) {
                setError( error.message);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">

             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <table min-w-full divide-y divide-gray-200>
                <thead className='min-w-full divide-y divide-gray-200 font-bold'>
                    <tr className='border bottom-1'>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">View Applicants</th>
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
                                    onClick={() => handleChangeStatus(apprenticeship.id)}
                                    className="text-green-500 hover:underline m-4"
                                >
                                    Change Status
                                </button>
                                <button
                                    onClick={() => navigate(`/employer/edit/${apprenticeship.id}`)}
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
                            <td className='border border-1'>
                                <button className='text-md underline text-blue-600'
                                    onClick={() => navigate(`/employer/view-applicants/${apprenticeship.id}`)}
                                >
                                    View Applicants
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

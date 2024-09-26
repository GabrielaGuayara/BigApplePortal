import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';


const ApplicationForm = ({ apprenticeshipId, userId }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Pending'); // default status
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const applicationData = {
            user: { id: userId }, // assuming you have user info
            apprenticeship: { id: apprenticeshipId },
            status,
            dateApplied: new Date(),
        };

        try {
            const response = await ApiService.applyForApprenticeship(userId, apprenticeshipId, applicationData);
            if (response.status === 200) {
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError('Application failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="p-6 container bg-[#EAD8B1] rounded">
            <h2 className="text-2xl font-bold mb-4">Apply for Apprenticeship</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;



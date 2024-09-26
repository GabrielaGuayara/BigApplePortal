import React, { useState } from 'react';
import ApiService from '../../Service/ApiService';

const AddApprenticeship = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [apprenticeshipType, setApprenticeshipType] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [requiredSkills, setRequiredSkills] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id');
        console.log(userId);

        const apprenticeshipData = {
            title,
            company,
            location,
            description,
            apprenticeshipType,
            salaryRange,
            experienceLevel,
            requiredSkills,
            status: 'OPEN',
            datePosted: new Date(), 
        };

        try {
            // Pass userId and apprenticeshipData to the API call
            await ApiService.addApprenticeship(userId, apprenticeshipData);
            setSuccess('Apprenticeship added successfully!');

            // Clear the form
            setTitle('');
            setCompany('');
            setLocation('');
            setDescription('');
            setApprenticeshipType('');
            setSalaryRange('');
            setExperienceLevel('');
            setRequiredSkills('');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-md w-100">
           <h2 className="text-xl font-bold mb-4">Add New Apprenticeship</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
           
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Apprenticeship Type</label>
                    <input
                        type="text"
                        value={apprenticeshipType}
                        onChange={(e) => setApprenticeshipType(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                    <input
                        type="text"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                    <input
                        type="text"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                    <input
                        type="text"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
               
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Apprenticeship
                </button>
            </form>
           </div>
    );
};


export default AddApprenticeship;








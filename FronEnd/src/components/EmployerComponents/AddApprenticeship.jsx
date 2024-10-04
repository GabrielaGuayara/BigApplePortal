import React, { useState } from 'react';
import ApiService from '../../Service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddApprenticeship = () => {

    //Holds all input values in a single formData object
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        apprenticeshipType: '',
        salaryRange: '',
        educationLevel: '',
        requiredSkills: '',
        logoURL: null,
    });

    
    //Function to handle user picture profile
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logoURL: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    //Function to update formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id');

        const apprenticeshipData = {
            ...formData,
            status: 'OPEN',
            datePosted: new Date().toISOString(),
            userId,
        };

        try {
           const response =  await ApiService.addApprenticeship(userId, apprenticeshipData);
            console.log(response);
           toast.success('Apprenticeship added successfully!');

            // Clear the form
            setFormData({
                title: '',
                location: '',
                company: '',
                description: '',
                apprenticeshipType: '',
                salaryRange: '',
                educationLevel: '',
                requiredSkills: '',
                logoURL: null,
            });
        } catch (error) {
           console.error(error);
        }
    };

    return (
        <div className="mx-auto p-4 bg-white rounded-lg shadow-md max-w-md w-full">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <h2 className="text-lg font-bold mb-4 text-blue">Fill out this form to add a new apprenticeship</h2>
           
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select a Borough</option>
                        <option value="Manhattan">Manhattan</option>
                        <option value="Brooklyn">Brooklyn</option>
                        <option value="Queens">Queens</option>
                        <option value="Bronx">Bronx</option>
                        <option value="Staten Island">Staten Island</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Apprenticeship Type</label>
                    <input
                        type="text"
                        name="apprenticeshipType"
                        value={formData.apprenticeshipType}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                    <input
                        type="text"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Education Level</label>
                    <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select Education Level</option>
                        <option value="High School">High School</option>
                        <option value="Associate">Associate</option>
                        <option value="Bachelor">Bachelor</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                    <input
                        type="text"
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Company Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add Apprenticeship
                </button>
            </form>
        </div>
    );
};

export default AddApprenticeship;



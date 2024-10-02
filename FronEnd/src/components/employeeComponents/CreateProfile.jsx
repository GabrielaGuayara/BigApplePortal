import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, AcademicCapIcon, PhoneIcon, MapPinIcon, DocumentTextIcon, CameraIcon } from '@heroicons/react/24/outline';
import ApiService from '../../Service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function CreateProfile() {
    const [profileInfo, setProfileInfo] = useState({
        skills: '',
        educationLevel: '',
        phoneNumber: '',
        location: '',
        summary: '',
        pictureURL: ''
    });

    const navigate = useNavigate(); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileInfo(prevState => ({ ...prevState, pictureURL: reader.result })); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id')

        try {
            const response = await ApiService.createUserProfile(userId, {
                skills: profileInfo.skills.split(','),
                educationLevel: profileInfo.educationLevel,
                phoneNumber: profileInfo.phoneNumber,
                location: profileInfo.location,
                summary: profileInfo.summary,
                pictureURL: profileInfo.pictureURL,
            });
            if (response.statusCode === 200) {
                // Navigate to user profile on success
                navigate('/user-profile'); 
            } else {
                toast.error('Error submitting profile'); 
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-blue text-center">Complete Your Professional Profile</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                                <UserCircleIcon className="h-5 w-5 mr-2 text-yellow" />
                                Skills (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="skills"
                                value={profileInfo.skills}
                                className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                                onChange={handleChange}
                                placeholder="e.g. JavaScript, React, Node.js"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                                <AcademicCapIcon className="h-5 w-5 mr-2 text-yellow" />
                                Education Level
                            </label>
                            <select
                                name="educationLevel" 
                                value={profileInfo.educationLevel}
                                className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                                onChange={handleChange}
                            >
                                <option value="">Select Education Level</option>
                                <option value="High School">High School</option>
                                <option value="Associate">Associate</option>
                                <option value="Bachelor">Bachelor</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-2 text-yellow" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber" 
                                value={profileInfo.phoneNumber}
                                className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                                <MapPinIcon className="h-5 w-5 mr-2 text-yellow" />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={profileInfo.location}
                                className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                                onChange={handleChange}
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-yellow" />
                            Professional Summary
                        </label>
                        <textarea
                            name="summary" 
                            value={profileInfo.summary}
                            className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                            rows="4"
                            onChange={handleChange}
                            placeholder="Briefly describe your professional background and career goals..."
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-indigo mb-2 flex items-center">
                            <CameraIcon className="h-5 w-5 mr-2 text-yellow" />
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray rounded-md p-2 focus:ring-2 focus:ring-yellow focus:border-transparent"
                        />
                    </div>
                    {profileInfo.pictureURL && (
                        <div className="flex justify-center">
                            <img src={profileInfo.pictureURL} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full border-4 border-yellow" />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue text-white font-bold py-3 px-4 rounded-md hover:bg-cerulean hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-opacity-50"
                    >
                        Submit Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

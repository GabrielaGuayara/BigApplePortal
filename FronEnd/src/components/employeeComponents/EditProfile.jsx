import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCircleIcon, AcademicCapIcon, PhoneIcon, MapPinIcon, CameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { SaveIcon } from 'lucide-react';
import ApiService from '../../Service/ApiService';
import { ToastContainer, toast } from 'react-toastify';

export default function EditProfile() {
    const { userId } = useParams();

    // State to manage the state of the user details
    const [profile, setProfile] = useState({
        pictureURL: '',
        phoneNumber: '',
        summary: '',
        educationLevel: '',
        skills: '',
    });

    const navigate = useNavigate();

    // useEffect to fetch user profile that will be used for the user to update 
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await ApiService.viewUserProfile(userId);
                
                // Check if response is successful and structured correctly
                if (response.statusCode === 200) {
                    setProfile({
                        ...response.userProfile,
                        skills: response.userProfile.skills.join(', ') || '',
                    });
                } else {
                    toast.error('Error fetching profile');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching profile: ' + error.message);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    pictureURL: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Function for updating user profile. This function calls an API from ApiServices 
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response =await ApiService.updateUserProfile(userId, profile);
                
                // Check if response indicates success
                if (response.statusCode === 200) {
                    toast.success('Profile updated successfully!'); // Success message
                    navigate(`/user-profile`);
                } else {
                    console.log(response);
                    toast.error('Error updating profile');
                }
            } catch (error) {
                toast.error('Error updating profile: ' + error.message);
            }
        };
        
    

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <div className="bg-blue p-8">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <UserCircleIcon className="h-10 w-10 mr-4" />
                            Edit Your Profile
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                {profile.pictureURL ? (
                                    <img src={profile.pictureURL} alt="Profile Preview" className="h-32 w-32 object-cover rounded-full border-4 border-yellow" />
                                ) : (
                                    <UserCircleIcon className="h-32 w-32 text-gray" />
                                )}
                                <label htmlFor="pictureUpload" className="absolute bottom-0 right-0 bg-yellow text-blue rounded-full p-2 cursor-pointer hover:bg-cerulean hover:text-white transition-colors duration-300">
                                    <CameraIcon className="h-6 w-6" />
                                </label>
                            </div>
                            <input
                                id="pictureUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <div>
                            <label className="text-indigo font-medium mb-2 flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-2 text-yellow" />
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={profile.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                            />
                        </div>
                        <div>
                            <label className="text-indigo font-medium mb-2 flex items-center">
                                <DocumentTextIcon className="h-5 w-5 mr-2 text-yellow" />
                                Summary
                            </label>
                            <textarea
                                name="summary"
                                value={profile.summary}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                            />
                        </div>
                        <div>
                            <label className="text-indigo font-medium mb-2 flex items-center">
                                <AcademicCapIcon className="h-5 w-5 mr-2 text-yellow" />
                                Education Level
                            </label>
                            <select
                                name="educationLevel"
                                value={profile.educationLevel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                            >
                                <option value="">Select Education Level</option>
                                <option value="High School">High School</option>
                                <option value="Associate">Associate</option>
                                <option value="Bachelor">Bachelor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-indigo font-medium mb-2">Skills (comma-separated)</label>
                            <input
                                type="text"
                                name="skills"
                                value={profile.skills}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-yellow text-blue font-bold py-3 px-4 rounded-full hover:bg-cerulean hover:text-white transition-colors duration-300 flex items-center justify-center"
                        >
                            <SaveIcon className="h-5 w-5 mr-2" />
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

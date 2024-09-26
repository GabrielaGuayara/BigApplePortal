import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../Service/ApiService'; 

const EditUser = () => {
    const { userId } = useParams();
    console.log(userId)
    const [userInfo, setUserInfo] = useState({
        email: '',
        phoneNumber: '',
        summary: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile(userId);
                if (response.statusCode === 200) {
                    setUserInfo(response.user); // Adjust based on your response structure
                } else {
                    setErrorMessage(response.message);
                }
            } catch (error) {
                setErrorMessage('Error fetching user profile.');
            }
        };

        fetchUserProfile();
    }, [userId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Update user profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          
            const response = await ApiService.updateUserProfile(userId, userInfo);
            console.log('hi')
            if (response.statusCode === 200) {
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setErrorMessage(response.message);
                setTimeout(() => setErrorMessage(''), 5000);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('Error updating profile.');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                {errorMessage && <p className="text-red-700">{errorMessage}</p>}
                {successMessage && <p className="text-green-700">{successMessage}</p>}
                <form onSubmit={handleUpdate}>
                  
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Email:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="email"
                            name="email"
                            value={userInfo.email || ''} // Ensure it's controlled
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Phone:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            name="phone"
                            value={userInfo.phoneNumber || ''} // Ensure it's controlled
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Summary:</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            name="summary"
                            value={userInfo.summary || ''} // Ensure it's controlled
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className="w-full bg-[#023e8a] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        type="submit"
                        onClick ={handleUpdate}
                   >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;

import React, { useState } from 'react';
import ApiService from "../Service/ApiService";
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();


    const [info, setInfo] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'EMPLOYEE',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber, role, summary } = info;
        if (!name || !email || !password || !phoneNumber || !role || !summary) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            // Call the register method from ApiService
            const response = await ApiService.registerUser(info);

            console.log(response)
            // Check if the response is successful
            if (response.statusCode === 200 || response ) {
                // Clear the form fields after successful registration
                setInfo({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: 'EMPLOYEE',
                });
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
             <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* This header will be only display for potenticial employees */}


                <h2  className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
            
            
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2"> Name:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="name" value={info.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Email:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="email" name="email" value={info.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Phone Number:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="phoneNumber" value={info.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Password:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="password" name="password" value={info.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Role:</label>
                    <select name="role" value={info.role} onChange={handleInputChange} required>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="EMPLOYER">Employer</option>
                    </select>
                </div>



                <button  className="w-full bg-[#023e8a]  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" type="submit">Register</button>
            </form>
            <p className="text-blue-800 hover:underline">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    </div>
    );
}

export default SignUp;
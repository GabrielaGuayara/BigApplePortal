import React, { useState } from 'react';
import ApiService from "../Service/ApiService";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    //Using useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    //Managing state of input values
    const [info, setInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE',
    });

    //Funtion to handle changes in input field. Destructuring to get name and value
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };


    //In this function I handle an API call to register the user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.registerUser(info);
            if (response.statusCode === 200 || response.statusCode || 201) {
                setInfo({
                    name: '',
                    email: '',
                    password: '',
                    role: 'EMPLOYEE',
                });
               toast.success('User registered successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
          toast.error("Error", error)
        }
    };

    return (
        //The sign up form will remder to get the user info
        <div className="flex justify-center items-center min-h-screen bg-cream p-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-indigo mb-6">Sign Up</h2>
                
                <form onSubmit={handleSubmit} className='bg-white'>
                    <div className="form-group mb-4">
                        <label className="block text-indigo font-medium mb-1">Name:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            name="name"
                            value={info.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-indigo font-medium mb-1">Email:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="email"
                            name="email"
                            value={info.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-indigo font-medium mb-1">Password:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="password"
                            name="password"
                            value={info.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-indigo font-medium mb-1">Role:</label>
                        <select
                            name="role"
                            value={info.role}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="EMPLOYER">Employer</option>
                        </select>
                    </div>

                    <button
                        className="w-full bg-blue hover:bg-yellow text-white font-bold py-2 px-4 rounded transition duration-300"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                <p className="text-blue hover:underline text-center mt-4">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;

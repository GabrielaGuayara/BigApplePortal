import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiService from "../Service/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  
  //useState to manage the state of user credentials
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  
  const navigate = useNavigate();


  //Funtion to update formData
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }



  //Handle form submission and call API to login the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.loginUser({
        email: formData.email, 
        password: formData.password 
      });
      if (response.statusCode === 200) {
        //If the response is successfull. I will take the following information from the response and save it on the localstorare to use it late
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);

        console.log(response)
        //If the login is succesful. Redirect user to home page
        navigate('/home');
      }
      
    } catch (error) {
       toast.error(error.message)

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cream">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
    
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              name='password'
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue hover:bg-yellow text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-center">
          Don't have an account? <Link to="/signup" className="text-cerulean hover:underline">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiService from "../Service/ApiService";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.loginUser({ email, password });
      if (response.statusCode === 200) {
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('id', response.id)
        localStorage.setItem('name', response.name)
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 5000);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}


        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button
            type="submit"
            className="w-full bg-[#023e8a]  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </button>
        </form>


        <p className="mt-6 text-gray-600 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-800 hover:underline">SignUp</Link>
        </p>
      </div>
    </div>
  );
}


export default Login;
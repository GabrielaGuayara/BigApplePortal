import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';

const AddNewAdminForm = () => {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: '',
    password: '',
    role: "ADMIN"
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAdminInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.registerAdmin(adminInfo);

      console.log(response);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setAdminInfo({
          name: "",
          email: "",
          password: "",
          role: "ADMIN"
        });

        setSuccessMessage('User registered successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.errorMessage || 'An error occurred');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {errorMessage && <p className='text-red-700'>{errorMessage}</p>}
        {successMessage && <p className='text-green-700'>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              value={adminInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={adminInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              value={adminInfo.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="w-full bg-[#023e8a] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdminForm;

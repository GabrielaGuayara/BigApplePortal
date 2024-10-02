import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewAdminForm = () => {
  const navigate = useNavigate();

  //useState to manage the state of adminInfo
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: '',
    password: '',
    role: "ADMIN"
  });

  //Funtion to handle changes to input state. Destructure the name and value from the event target and
  //update adminInfo using the previous state
    const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAdminInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  //Handle form submission. Call an API from ApiService to register a new admin
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

        toast.success('User registered successfully');
      
      }
    } catch (error) {
      toast.error('An error occurred');
     
    }
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100 py-3">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <h2 className='mb-6 font-bold text-xl'>Fill out the form to add a new ADMIN</h2>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      
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

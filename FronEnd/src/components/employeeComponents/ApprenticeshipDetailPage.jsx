import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApprenticeshipDetails from './ApprenticeshipDetails';


const ApprenticeshipDetailPage = () => {
  const userId = localStorage.getItem('id')
  //Get apprenticeship id from URL parameters
  const { id } = useParams();

  //Sets states to store apprenticeship, message and showModal
  const [apprenticeship, setApprenticeship] = useState(null);
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false);

  //useEffect to fetch apprenticeship details. Call API from ApiServices and update apprenticeship
  useEffect(() => {
    const fetchApprenticeship = async () => {
      try {
        const data = await ApiService.getApprenticeshipById(id)
        setApprenticeship(data.apprenticeship);
      } catch (error) {
        console.error("Error fetching apprenticeship:", error);
      
      }
    };
    fetchApprenticeship();
  }, [id]);


  //Handle apply and call API from API services to post a new application
  const handleApply = async () => {
    try {
      const response = await ApiService.applyForApprenticeship(userId, id);
      console.log(response)
      if (response.statusCode === 200 || response.statusCode === 201) {
        setMessage('Application submitted successfully! Check your profile to see your applications.');
        setShowModal(true);
      } else {
        setMessage('Application failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } 
  };

 
  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <ApprenticeshipDetails
      apprenticeship={apprenticeship}
      handleApply={handleApply}
      showModal={showModal}
      setShowModal={setShowModal}
      message={message}
      />
    </div>
  );
}

export default ApprenticeshipDetailPage;
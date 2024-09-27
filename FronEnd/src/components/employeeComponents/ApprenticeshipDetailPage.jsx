import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../Service/ApiService';


export default function ApprenticeshipDetailPage() {
  const { id } = useParams();
  const [apprenticeship, setApprenticeship] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");


  useEffect(() => {
    const fetchApprenticeship = async () => {
      try {
        const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setApprenticeship(data.apprenticeship);
      } catch (error) {
        console.error("Error fetching apprenticeship:", error);
        setMessage('Failed to load apprenticeship details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprenticeship();
  }, [id, token]);


  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.applyForApprenticeship(userId, id);
      if (response.ok) {
        setMessage('Application submitted successfully! Check your dashboard to see your applications.');
        setShowModal(true);
      } else {
        setMessage('Application failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (!apprenticeship) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">Failed to load apprenticeship details.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-800 p-6">
          <h2 className="text-3xl font-bold text-white">{apprenticeship.title}</h2>
          <p className="mt-2 text-blue-200">Posted on: {new Date(apprenticeship.datePosted).toLocaleDateString()}</p>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{apprenticeship.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">{apprenticeship.experienceLevel}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">{apprenticeship.location}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">{apprenticeship.salaryRange}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">{apprenticeship.status}</span>
            </div>
          </div>
          <button
            onClick={handleApply}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Applying...' : 'Apply Now'}
          </button>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Application Successful!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {message}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ApiService from '../../Service/ApiService';

// const ApprenticeshipDetailPage = () => {
//     const { id } = useParams();
//     const [apprenticeship, setApprenticeship] = useState(null);
//     const [message, setMessage] = useState('');
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("id");

//     useEffect(() => {
//         const fetchApprenticeship = async () => {
//             const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const data = await response.json();
        
//             setApprenticeship(data.apprenticeship);
//             console.log(apprenticeship)
//         };
//         fetchApprenticeship();
//     }, [id]);

//     const handleApply = async () => {
//         try {
//             const response = await ApiService.applyForApprenticeship(userId, id);
//             if (response.ok) {
//                 setMessage('Application submitted successfully! Check your dashboard to see your applications.');
//             } else {
//                 setMessage('Application failed. Please try again.');
//             }
//         } catch (error) {
//             setMessage('An error occurred. Please try again.');
//         }
//     };

//     if (!apprenticeship) return <div>Loading...</div>;

//     return (
//         <div className="p-6 container bg-[#EAD8B1]">
//             <h2 className="text-2xl font-bold mb-4">{apprenticeship.title}</h2>
//             <p>{apprenticeship.description}</p>
//             <p>{apprenticeship.datePosted}</p>
//             <p>{apprenticeship.experienceLevel}</p>
//             <p>{apprenticeship.location}</p>
//             <p>{apprenticeship.salaryRange}</p>
//             <p>{apprenticeship.status}</p>
//             <p>{apprenticeship.title}</p>
//             <button
//                 onClick={handleApply}
//                 className="bg-blue-500 text-white p-2 rounded mt-4"
//             >
//                 Apply
//             </button>
//             {message && <p className="mt-4 text-green-600">{message}</p>}
//         </div>
//     );
// };

// export default ApprenticeshipDetailPage;



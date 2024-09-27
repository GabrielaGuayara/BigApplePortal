import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const token = localStorage.getItem("token");


export default function ViewApplicants() {
  const [dataApplications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { id } = useParams();


  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.apprenticeship && data.apprenticeship.applications) {
          setApplications(data.apprenticeship.applications);
          setFilteredApplications(data.apprenticeship.applications);
        } else {
          console.log("No data found for the given ID");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApplicants();
  }, [id]);


  const handleDateFilter = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      const filtered = dataApplications.filter(app => 
        new Date(app.dateApplied).toISOString().split('T')[0] === date
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(dataApplications);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Application Details</h1>
        
        <div className="mb-6 flex justify-between items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateFilter}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-600">
            Showing {filteredApplications.length} of {dataApplications.length} applications
          </p>
        </div>


        {filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map((application, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">{application.user.name}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Date Applied:</span> {new Date(application.dateApplied).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Email:</span> {application.user.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Phone:</span> {application.user.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-700">Summary:</span> {application.user.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">No applicants found</p>
        )}
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const token = localStorage.getItem("token");

// const ViewApplicants = () => {
//     const [dataApplications, setApplication] = useState([]);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchApplicants = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
                
//                 // Check if data.apprenticeship exists
//                 if (data.apprenticeship) {
//                     setApplication(data.apprenticeship.applications);
//                 } else {
//                     console.log("No data found for the given ID");
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchApplicants();
//     }, [id]); // Make sure to include id as a dependency

//     // // For debugging
//     // useEffect(() => {
//     //     console.log("Current dataApplications:", dataApplications);
//     // }, [dataApplications]);

//     return (
//         <>
//          <h1>
//                 Application details
//         </h1>
//         <div className="p-6 container bg-[#EAD8B1]">
//             {dataApplications.length > 0 ? (
//                 <div>
//                     <h2 className="text-2xl font-bold mb-4">{dataApplications[0].dateApplied}</h2>
//                     <h2 className="text-2xl font-bold mb-4">{dataApplications[0].user.name}</h2>
//                     <h2 className="text-2xl font-bold mb-4">{dataApplications[0].user.email}</h2>
//                     <h2 className="text-2xl font-bold mb-4">{dataApplications[0].user.phoneNumber}</h2>
//                     <h2 className="text-2xl font-bold mb-4">{dataApplications[0].user.summary}</h2>
                    
//                 </div>
//             ) : (
//                 <p>No applicants found</p>
//             )}
           
//         </div>
//         </>
//     );
// };

// export default ViewApplicants;

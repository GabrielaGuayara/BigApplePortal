import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("token");

  // State variables for managing applications and filters

 const ViewApplicants = () => {
  const [dataApplications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [viewingProfileId, setViewingProfileId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { id } = useParams();


    // Fetch applications when the component mounts or the ID changes
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


   // Set applications data if available
  const handleDateFilter = (e) => {
    const date = e.target.value;
    console.log(date)
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

  //Function to clear filters
  const clearFilters = () => {
    setSelectedDate('');
    setFilteredApplications(dataApplications);
  };

  //Function to fetch data about user-profile
  const viewEmployeeProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user-profile/view/${userId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProfileData(data.userProfile);
        setViewingProfileId(userId);
        console.log(data.userProfile);
      } else {
        console.error(data.message || 'Error fetching profile');
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedApplications = dataApplications.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApplications);
        setFilteredApplications(updatedApplications);
        toast.success("Application status updated successfully");
      } else {
        toast.error( 'Error updating application status');
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const toggleDetails = (userId) => {
    if (viewingProfileId === userId) {
      setShowDetails(!showDetails);
    } else {
      setViewingProfileId(userId);
      setShowDetails(true);
      viewEmployeeProfile(userId);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue mb-8 text-center">Application Details</h1>

        <div className="mb-6 flex justify-between items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateFilter}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={clearFilters} 
            className="ml-4 bg-red text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
          >
            Clear Filters
          </button>
          <p className="text-gray-600">
            Showing {filteredApplications.length} of {dataApplications.length} applications
          </p>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map((application, index) => (
              <div key={index} className="bg-lightblue shadow-lg rounded-lg overflow-hidden border-2 border-blue-500">
                <div className="bg-blue px-6 py-4">
                  <h2 className="text-2xl font-semibold text-white">{application.user.name}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Date Applied:</span> {new Date(application.dateApplied).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Email:</span> {application.user.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-blue-700">Status:</span> {application.status}
                  </p>

                  <button
                    onClick={() => toggleDetails(application.user.id)} 
                    className="mt-4 bg-blue text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {viewingProfileId === application.user.id && showDetails ? 'Hide Details' : 'View More Details'}
                  </button>

                  <div className="mt-4">
                    <select
                      onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                      value={application.status}
                      className="mt-1 block bg-indigo text-white font-bold w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>

                  {profileData && viewingProfileId === application.user.id && showDetails && (
                    <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                      <h2 className="text-xl font-bold text-blue mb-4">Employee information</h2>
                      <img className="w-40 rounded-xl" src={profileData.pictureURL} alt="Employee" />
                      <p><span className="font-semibold text-blue">Phone:</span> {profileData.phoneNumber}</p>
                      <p><span className="font-semibold text-blue">Skills:</span> {profileData.skills}</p>
                      <p><span className="font-semibold text-blue">Education Level:</span> {profileData.educationLevel}</p>
                      <p><span className="font-semibold text-blue">Summary:</span> {profileData.summary}</p>
                    </div>
                  )}
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

export default ViewApplicants;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RequestProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
   const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfile = async () => {
          const response = await fetch(`http://localhost:8080/user-profile/view/${id}`, {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });

          const data = await response.json();
          if (response.ok) {
              setProfile(data.userProfile)
              console.log(data); // Ensure you're getting the userProfile object
          } else {
              console.error(data.message || 'Error fetching profile');
          }
      };
       

        fetchProfile();
    }, [userId, token]);


    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-blue-600 p-6 sm:p-8">
                        <h2 className="text-3xl font-bold text-white text-center">Welcome, {name}</h2>
                    </div>
                    <div className="p-6 sm:p-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-blue-800 mb-6">User Details</h3>
                            {!profile ? (
                                <p className="text-gray-600 text-center">No information found.</p>
                            ) : (
                                <>
                                    <ul className="space-y-6">
                                        {profile.pictureURL && (
                                            <img src={profile.pictureURL} alt="Profile" className="h-32 w-32 object-cover rounded-full mb-4" />
                                        )}
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                            {name}
                                        </li>
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                            {profile.email}
                                        </li>
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                            {profile.phoneNumber}
                                        </li>
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                            {profile.location}
                                        </li>
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                           
                                                       {profile.skills.map((skill, index) => (
                    <li key={index} className="bg-gray-50 rounded-lg p-4 shadow-md">
                        {skill}
                    </li>
                ))}


                                        </li>
                                        <li className="bg-gray-50 rounded-lg p-6 shadow-md flex items-center">
                                            {profile.educationLevel}
                                        </li>
                                    </ul>
                                    <div className="bg-gray-50 rounded-lg p-6 shadow-md flex flex-col my-3">
                                        <h2 className='font-bold'>About Me</h2>
                                        <p>{profile.summary || 'No summary available.'}</p>
                                       
                                    </div>
                                </>
                            )}
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-800 mb-6">Application History</h3>
                        {!applications.length ? (
                            <p className="text-gray-600 text-center">No applications found.</p>
                        ) : (
                            <ul className="space-y-6">
                                {applications.map(application => (
                                    <li key={application.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
                                        <h4 className="text-xl font-semibold text-blue-700 mb-2">{application.apprenticeship.title}</h4>
                                        <p className="text-gray-600 mb-2">Date Applied: {new Date(application.dateApplied).toLocaleDateString()}</p>
                                        <p className="text-gray-600">
                                            Status: <span className={`font-semibold ${application.applicationStatus === 'Accepted' ? 'text-green-600' : application.applicationStatus === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{application.applicationStatus}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestProfilePage;

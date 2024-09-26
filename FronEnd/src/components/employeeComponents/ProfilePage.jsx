import { DevicePhoneMobileIcon, ExclamationCircleIcon, PencilIcon, PhoneArrowDownLeftIcon, UserIcon } from '@heroicons/react/20/solid';
import { Inbox, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const userId = localStorage.getItem("id");
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`http://localhost:8080/users/get-profile-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      const data = await response.json();
      setProfile(data.user);
      // setApplications(data.applications)
    };

    const fetchApplications = async () => {
      const response = await fetch(`http://localhost:8080/applications/view/${userId}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setApplications(data.applications);
    };

    fetchProfile();
    fetchApplications();
  }, [userId]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    const applicationData = { status: newStatus };
    
    try {
      const response = await fetch(`http://localhost:8080/applications/update/${userId}/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        setApplications(applications.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
      } else {
        alert('Failed to update application status. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };



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
               
                  <li className="bg-gray-50 rounded-lg p-6 shadow-md flex mr-3">
                   <UserIcon className='w-8'/> {profile.name}
                  </li>
                  <li key={profile.id} className="bg-gray-50 rounded-lg p-6 shadow-md flex mr-3">
                   <Inbox className='w-8'/> {profile.email}
                  </li>
                  <li key={profile.id} className="bg-gray-50 rounded-lg p-6 shadow-md flex mr-3">
                   <DevicePhoneMobileIcon className='w-8'/> {profile.phoneNumber}
                  </li>
              
              </ul>
              {
                !profile.summary ?(
                  <div className="bg-gray-50 rounded-lg p-6 shadow-md flex flex-col my-3">
                  <h2 className='font-bold'>About Me</h2>
                  <li key={profile.id} className='list-none' >
                    {profile.summary}
                  </li>
              </div>
                ):(
                  <div className="bg-gray-50 rounded-lg p-6 shadow-md flex flex-col my-3">
                    <div className='flex'>
                    Click on edit profile and add a summary  
                    <button className='btn bg-red-700 rounded ml-5 w-8'> Edit
                    <PencilIcon className='w-5 text-white '/>
                    </button>
                    </div>
                  </div>
                )
              }
              </>
            )}
            </div>




            <h3 className="text-2xl font-semibold text-blue-800 mb-6">Application History</h3>
            {!applications ? (
              <p className="text-gray-600 text-center">No applications found.</p>
            ) : (
              <ul className="space-y-6">
                {applications.map(application => (
                  <li key={application.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
                    <h4 className="text-xl font-semibold text-blue-700 mb-2">{application.apprenticeship.title}</h4>
                    <p className="text-gray-600 mb-2">Date Applied: {new Date(application.dateApplied).toLocaleDateString()}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">
                        Status: <span className={`font-semibold ${application.status === 'Accepted' ? 'text-green-600' : application.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{application.status}</span>
                      </p>
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application.id, e.target.value)}
                        className="mt-2 border rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


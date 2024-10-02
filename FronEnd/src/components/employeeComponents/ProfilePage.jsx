import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon} from '@heroicons/react/24/outline';
import ApiService from '../../Service/ApiService';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const userId = localStorage.getItem("id");
    const name = localStorage.getItem('name');
    const navigate = useNavigate();


    //Effect to fech profile and application by user
    useEffect(() => {
        const fetchProfile = async () => {
           try{ 
            
            const response = await ApiService.viewUserProfile(userId);
                
            if (response.statusCode === 200) {
                setProfile(response.userProfile);
            } else {
                console.error('Error fetching profile');
            }
        }catch(e){
            console.error(e)
        }

    }
        const fetchApplications = async () => {
            try{
                const response = await ApiService.getApplicationsByUserId(userId)
                console.log(response)
                if(response.statusCode === 200 || response.statusCode === 201){
                setApplications(response.applications)
                console.log(response.applications)
                }
            }catch(e){
                console.error(e)
            }
        };

        fetchProfile();
        fetchApplications();
    }, [userId]);

    const handleUserProfileEdit = () => {
        navigate(`/employee/edit-profile/${userId}`);
    };



    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
       
           {!profile ?
           <div className='text-center'>
           <p className='mb-4'>No profile found</p>
           <button className=" bg-blue hover:bg-yellow text-white font-bold py-2 px-4 rounded transition duration-300 w-3/12 h-10"  onClick ={(()=>navigate(`/employee/create-profile`))}>
            Create your profile
           </button>
           </div>
           :
           <div className="max-w-5xl mx-auto">
           <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
               <div className="bg-blue p-8 flex flex-col sm:flex-row items-center justify-between">
                   <div className="flex items-center mb-4 sm:mb-0">
                       {profile.pictureURL ? (
                           <img src={profile.pictureURL} alt="Profile" className="h-24 w-24 rounded-full border-4 border-yellow object-cover" />
                       ) : (
                           <UserCircleIcon className="h-24 w-24 text-yellow" />
                       )}
                       <h2 className="text-3xl font-bold text-white ml-4">{name}</h2>
                   </div>
                   <button 
                       onClick={handleUserProfileEdit}
                       className="bg-yellow text-blue font-semibold py-2 px-4 rounded-full hover:bg-cerulean hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center"
                   >
                   
                       Edit Profile
                   </button>
               </div>
               <div className="p-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                       <div className="space-y-4">
                           <div className="flex items-center text-indigo">
                              
                               <span>{profile.phoneNumber}</span>
                           </div>
                           <div className="flex items-center text-indigo">
                              
                               <span>{profile.location}</span>
                           </div>
                           <div className="flex items-center text-indigo">
                             
                               <span>{profile.educationLevel}</span>
                           </div>
                       </div>
                       <div>
                           <h3 className="text-xl font-semibold text-blue mb-2">Skills</h3>
                           <div className="flex flex-wrap gap-2">
                               {profile.skills.map((skill, index) => (
                                   <span key={index} className="bg-lightblue text-cerulean px-3 py-1 rounded-full text-sm">
                                       {skill}
                                   </span>
                               ))}
                           </div>
                       </div>
                   </div>
                   <div className="bg-lightblue rounded-xl p-6 mb-8">
                       <h3 className="text-xl font-semibold text-blue mb-2">About Me</h3>
                       <p className="text-indigo">{profile.summary || 'No summary available.'}</p>
                   </div>
                   <div>
                       <h3 className="text-2xl font-semibold text-blue mb-6">Application History</h3>
                       {!applications ? (
                           <p className="text-indigo text-center">No applications found.</p>
                       ) : (
                           <div className="space-y-4">
                               {applications.map(application => (
                                   <div key={application.id} className="bg-white border border-gray rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                                       <div className="flex items-center justify-between mb-2">
                                           <h4 className="text-lg font-semibold text-blue">{application.apprenticeship.title}</h4>
                                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                               application.applicationStatus === 'Accepted' ? 'bg-green-100 text-green-800' :
                                               application.applicationStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                                               'bg-yellow-100 text-yellow-800'
                                           }`}>
                                               {application.applicationStatus}
                                           </span>
                                       </div>
                                       <div className="flex items-center text-indigo">
                                           <span>Applied on {new Date(application.dateApplied).toLocaleDateString()}</span>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </div>
               </div>
           </div>
       </div>

           }
        </div>
    );
}


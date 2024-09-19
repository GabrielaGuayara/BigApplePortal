import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
// import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react";


const ApprenticeshipDetailPage = () => {
    const { id } = useParams();
    const [apprenticeship, setApprenticeship] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchApprenticeship = async () => {
            const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
            const data = await response.json();
            console.log(data.apprenticeship)
            console.log(userId)
            setApprenticeship(data.apprenticeship);
        };
        fetchApprenticeship();
    }, [id]);


    if (!apprenticeship) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{apprenticeship.title}</h2>
            <p>{apprenticeship.company}</p>
            <p>{apprenticeship.description}</p>
            <button  className="bg-blue-500 text-white p-2 rounded mt-4">Apply</button>
        </div>

);
};

export default ApprenticeshipDetailPage;




//     <div className="container mx-auto px-4 py-8">
//       {/* Job Details Card */}
//       <div className="bg-white shadow-md rounded-lg mb-8">
//         <div className="border-b border-gray-200 p-4">
//           <h2 className="text-2xl font-bold">Senior Software Engineer</h2>
//           <p className="text-gray-600">TechCorp Inc.</p>
//         </div>
//         <div className="p-4">
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             {/* Job Information */}
//             <InfoItem icon={<Briefcase className="h-4 w-4" />} text="Full-time" />
//             <InfoItem icon={<MapPin className="h-4 w-4" />} text="San Francisco, CA" />
//             <InfoItem icon={<DollarSign className="h-4 w-4" />} text="$120,000 - $160,000" />
//             <InfoItem icon={<Calendar className="h-4 w-4" />} text="Posted 2 days ago" />
//           </div>
//           <section className="mb-4">
//             <h3 className="text-lg font-semibold mb-2">Job Description</h3>
//             <p className="text-gray-800">
//               We are seeking a talented Senior Software Engineer to join our dynamic team. The ideal candidate will
//               have a strong background in full-stack development and a passion for creating innovative solutions.
//             </p>
//           </section>
//           <section className="mb-4">
//             <h3 className="text-lg font-semibold mb-2">Requirements</h3>
//             <ul className="list-disc list-inside text-gray-800">
//               <li>5+ years of experience in software development</li>
//               <li>Proficiency in JavaScript, React, and Node.js</li>
//               <li>Experience with cloud platforms (AWS, Azure, or GCP)</li>
//               <li>Strong problem-solving and communication skills</li>
//             </ul>
//           </section>
//         </div>
//       </div>


//       <div className="bg-white shadow-md rounded-lg">
//         <div className="border-b border-gray-200 p-4">
//           <h2 className="text-lg font-bold">Apply for this position</h2>
//         </div>
//         <div className="p-4">
//           <form>
//             <div className="grid gap-4">
//               <FormField id="name" label="Name" type="text" placeholder="Enter your full name" />
//               <FormField id="email" label="Email" type="email" placeholder="Enter your email" />
//               <FormField id="resume" label="Resume" type="file" />
//               <div className="flex flex-col space-y-1.5">
//                 <label htmlFor="cover-letter" className="font-semibold">Cover Letter</label>
//                 <textarea
//                   id="cover-letter"
//                   placeholder="Write your cover letter here"
//                   className="p-2 border rounded"
//                   rows="4"
//                 />
//               </div>
//             </div>
//           </form>
//         </div>
//         <div className="border-t border-gray-200 p-4 flex justify-between">
//           <button className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200">Cancel</button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit Application</button>
//         </div>
//       </div>
//     </div>
//   );
// }


// function InfoItem({ icon, text }) {
//   return (
//     <div className="flex items-center">
//       {icon}
//       <span className="ml-2">{text}</span>
//     </div>
//   );
// }


// function FormField({ id, label, type, placeholder }) {
//   return (
//     <div className="flex flex-col space-y-1.5">
//       <label htmlFor={id} className="font-semibold">{label}</label>
//       <input
//         id={id}
//         type={type}
//         placeholder={placeholder}
//         className="p-2 border rounded"
//       />
//     </div>
//   );
// }





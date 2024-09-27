import React,{useState} from 'react';
import ViewPostedApprenticeships from './ViewPostedApprenticeship';
import AddApprenticeship from './AddApprenticeship';
import EmployerSidebar from './EmployerSidebar';
import CarouselImage2 from "../../images/CarouselImage2.jpg"

export default function EmployerDashboard() {
  const employerName = localStorage.getItem("name");
  const [activeComponent, setActiveComponent] = useState('Welcome');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addApprenticeship':
        return <AddApprenticeship />;
      case 'viewApprenticeships':
        return <ViewPostedApprenticeships />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Welcome, {employerName}</h2>
            <p className="text-xl text-yellow-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
    <EmployerSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div 
        className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${CarouselImage2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {renderComponent()}
      </div>
    </div>
  </div>


   
  );
}


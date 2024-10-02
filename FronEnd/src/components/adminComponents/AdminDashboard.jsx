import React, { useState } from 'react';
import SidebarDashboard from '../adminComponents/SidebarDashboard';
import ViewAllUsers from './ViewAllUsers';
import CarouselImage2 from "../../images/CarouselImage2.jpg"
import AddNewAdminForm from './AddNewAdminForm';

export default function AdminDashboard() {
 //Grab the name from the local storage
  const name = localStorage.getItem('name')

  //useState to manage the state of the activeComponent that will be rendered
  const [activeComponent, setActiveComponent] = useState('Welcome');

  //Function to manage the state of the active component that will be rendered base on the activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'addAdmin':
        return <AddNewAdminForm />;
      case 'viewUsers':
        return <ViewAllUsers />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Welcome!</h2>
            <h2 className="text-4xl font-bold text-blue-600 mb-4">{name}</h2>
            <p className="text-xl text-yellow-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Passing activeComponent and activiveCompenents as props to sideDashboard */}
      <SidebarDashboard setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
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


import React, { useState } from 'react';
import SidebarDashboard from '../adminComponents/SidebarDashboard';
import ViewAllUsers from './ViewAllUsers';
import Carousel from "../../assets/CarouselImage2.jpg"
import AddNewAdminForm from './AddNewAdminForm';

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('Welcome');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addAdmin':
        return <AddNewAdminForm />;
      case 'viewUsers':
        return <ViewAllUsers />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-xl text-yellow-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <SidebarDashboard setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div 
          className="bg-white rounded-lg shadow-lg p-6 md:p-8 h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${Carousel})`,
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


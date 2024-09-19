import React from 'react';
import SidebarDashboard from '../adminComponents/SidebarDashboard';
import EmployerTable from '../adminComponents/Table';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-[#FFF7F7]">
      <SidebarDashboard />
      <div className="flex-1 overflow-y-auto p-4">
        <EmployerTable />
      </div>
    </div>
  );
};

export default AdminDashboard;



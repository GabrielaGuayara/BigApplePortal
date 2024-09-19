import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';

const SidebarDashboard = () => {
  return (
    <div className="flex flex-col w-64 p-4 text-white bg-[#758694] h-screen shadow-md border-r border-gray-200">
      <h1 className="text-2xl font-extrabold mb-6">Welcome</h1>
      <nav className="flex flex-col flex-grow">
        <Link to="/new-category" className="flex items-center my-2 p-2 rounded-lg hover:bg-[#5b6d7e] transition duration-300 ease-in-out">
          <Plus className='h-5 w-5 mr-2' /> New Category
        </Link>
        <Link to="/view-employers" className="flex items-center my-2 p-2 rounded-lg hover:bg-[#5b6d7e] transition duration-300 ease-in-out">
          View All Employers
        </Link>
        <Link to="/view-employees" className="flex items-center my-2 p-2 rounded-lg hover:bg-[#5b6d7e] transition duration-300 ease-in-out">
          View All Employees
        </Link>
      </nav>
      <button className="mt-auto flex items-center my-2 p-2 rounded-lg text-red-300 hover:bg-[#5b6d7e] transition duration-300 ease-in-out">
        <LogOut className='h-5 w-5 mr-2' /> Log out
      </button>
    </div>
  );
};

export default SidebarDashboard;




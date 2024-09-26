import React from 'react';

export default function SidebarDashboard({ setActiveComponent, activeComponent }) {
  const menuItems = [
    { name: 'Dashboard', component: 'default' },
    { name: 'Add New Admin', component: 'addAdmin' },
    { name: 'View All Users', component: 'viewUsers' },
  ];

  return (
    <div className="w-full md:w-64 bg-blue-600 text-white">
      <h2 className="text-2xl font-bold p-6 bg-blue-700 cursor-pointer hover:bg-blue-800 transition-colors duration-200"
        onClick={() => setActiveComponent('default')}
      >
        Admin Dashboard
      </h2>
      <ul className="space-y-2 p-4">
        {menuItems.map((item) => (
          <li key={item.component}>
            <button
              onClick={() => setActiveComponent(item.component)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeComponent === item.component
                  ? 'bg-yellow-500 text-blue-900 font-semibold'
                  : 'hover:bg-blue-500'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


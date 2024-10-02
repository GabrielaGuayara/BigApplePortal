import React from 'react';

export default function SidebarDashboard({ setActiveComponent, activeComponent }) {
  
  //Array of object that will be used to define menu items for the sidebar
  const menuItems = [
    { name: 'Dashboard', component: 'default' },
    { name: 'Add New Admin', component: 'addAdmin' },
    { name: 'View All Users', component: 'viewUsers' },
  ];

  return (
    <div className="w-full md:w-64 bg-indigo text-white">
      <h2 className="text-2xl font-bold p-6 bg-blue-700 cursor-pointer hover:bg-yellow transition-colors duration-200"
      //Set the activive component to default
      onClick={() => setActiveComponent('default')}
      
      >
        Admin Dashboard
      </h2>
      <ul className="space-y-2 p-4">
        {menuItems.map((item) => (
          <li key={item.component}>
            <button
              // Change active component on click
              onClick={() => setActiveComponent(item.component)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeComponent === item.component
                  ? 'bg-yellow font-semibold'
                  : 'hover:bg-blue'
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


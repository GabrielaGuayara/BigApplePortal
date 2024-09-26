import React from 'react';

const EmployerSidebar = ({ setActiveComponent }) => {
    return (
        <div className="w-64 bg-white shadow-md">
            <h2 className="text-xl font-bold p-4"   
             onClick={() => setActiveComponent('default')}
            >Employer Dashboard</h2>
            <ul className="space-y-2 p-4">
                <li>
                    <button
                        onClick={() => setActiveComponent('addApprenticeship')}
                        className="w-full text-left p-2 hover:bg-gray-200"
                    >
                        Add New Apprenticeship
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveComponent('viewApprenticeships')}
                        className="w-full text-left p-2 hover:bg-gray-200"
                    >
                        View Posted Apprenticeship
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default EmployerSidebar;




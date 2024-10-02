import React from 'react';

const EmployerSidebar = ({ setActiveComponent }) => {
    return (
        <div className="w-64 bg-cerulean shadow-md text-white">
            <h2 className="text-xl  text-yellow font-bold p-4"   
             onClick={() => setActiveComponent('default')}
            >Employer Dashboard</h2>
            <ul className="space-y-2 p-4">
                <li>
                    <button
                        onClick={() => setActiveComponent('addApprenticeship')}
                        className="w-full text-left p-2 hover:bg-lightblue"
                    >
                        Add New Apprenticeship
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveComponent('viewApprenticeships')}
                        className="w-full text-left p-2 hover:bg-lightblue"
                    >
                        View Posted Apprenticeship
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default EmployerSidebar;




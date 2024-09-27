import { useState, useEffect } from 'react';

const AppliedApprenticeships = () => {
    const [applied, setApplied] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchApplied = async () => {
            const response = await fetch(`/api/employee/applied`);
            const data = await response.json();
            setApplied(data);
        };
        fetchApplied();
    }, [user.id]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Applied Apprenticeships</h2>
            <ul className="space-y-4">
                {applied.map((apprenticeship) => (
                    <li key={apprenticeship.id} className="p-4 border border-gray-300 rounded-lg">
                        <p><strong>Title:</strong> {apprenticeship.title}</p>
                        <p><strong>Company:</strong> {apprenticeship.company}</p>
                        <p><strong>Status:</strong> {apprenticeship.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppliedApprenticeships;




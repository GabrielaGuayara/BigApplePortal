import React, { useState, useEffect } from 'react';

const EmployeeProfile = () => {
    const [profile, setProfile] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:8080/api/employee/profile/${user.id}`);
            const data = await response.json();
            setProfile(data);
        };
        fetchProfile();
    }, [user.id]);

    if (!profile) return <div className="p-6 text-gray-700">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Profile</h2>
            <div className="space-y-4">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Skills:</strong> {profile.skills}</p>
                {/* Add more profile details as needed */}
            </div>
        </div>
    );
};

export default EmployeeProfile;




import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService'; 

const ViewAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [filteredRole, setFilteredRole] = useState(''); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await ApiService.getAllUsers();
                console.log(data.userList)
                setUsers(data.userList);
            } catch (error) {
               console.error(error)
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await ApiService.deleteUser(userId)
            setUsers(users.filter(newArr => newArr.id !== userId));
        } catch (error) {
            console.error(error)
        }
    };

    // Filter users based on selected role
    const filteredUsers = filteredRole
        ? users.filter(user => user.role === filteredRole)
        : users;


    return (
        <div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <h2 className="text-l font-semibold mb-4">All Users</h2>

            {/* Role filter dropdown */}
            <div className="mb-4">
                <label className="mr-2">Filter by Role:</label>
                <select
                    value={filteredRole}
                    onChange={(e) => setFilteredRole(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="">All</option>
                    <option value="ADMIN">Admin</option>
                    <option value="EMPLOYER">Employer</option>
                    <option value="EMPLOYEE">Employee</option>
                </select>
            </div>

            <table className="min-w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!filteredUsers ? 
                    <p>No users found</p>
                    :(
                    filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-500 hover:underline m-4"
                            >
                                Delete
                            </button>

                            </td>
                        </tr>
                    )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllUsers;




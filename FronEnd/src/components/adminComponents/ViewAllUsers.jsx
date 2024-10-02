import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService'; 
import { DeleteIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAllUsers = () => {

    //State to hold the list of users and the filtered role
    const [users, setUsers] = useState([]);
    const [filteredRole, setFilteredRole] = useState(''); 


    //UseEffect to fetch users when the component mounts. Call an API to getAllUsers
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await ApiService.getAllUsers();
                setUsers(data.userList);
            } catch (error) {
               console.error(error)
            }
        };

        fetchUsers();
    }, []);

    
    //Funtion to handle the user deletion. Call API from ApiServices to delete the user and
    //update state using filtering to remove deleted user
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
        <div >
            {/* Toasty component to add notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <h2 className="text-l font-semibold mb-4">All Users</h2>

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

            <table className="w-1/2 border-collapse border border-gray-400 bg-cream text-center p-6 m-auto">
                <thead>
                    <tr className='bg-indigo text-white'>
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
                        <tr key={user.id} >
                            <td className="border border-gray-300 px-4 py-2 font-bold">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td className='border border-gray-300 flex  justify-center'>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-white hover:underline m-4 btn bg-red border border-gray-300 px-4 py-2 rounded flex  "
                            >
                               Delete<DeleteIcon className='ml-3'/> 
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




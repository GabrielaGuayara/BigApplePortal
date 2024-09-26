import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../Service/ApiService';

const ApprenticeshipDetailPage = () => {
    const { id } = useParams();
    const [apprenticeship, setApprenticeship] = useState(null);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchApprenticeship = async () => {
            const response = await fetch(`http://localhost:8080/apprenticeships/get-by-id/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setApprenticeship(data.apprenticeship);
        };
        fetchApprenticeship();
    }, [id]);

    const handleApply = async () => {
        try {
            const response = await ApiService.applyForApprenticeship(userId, id);
            if (response.ok) {
                setMessage('Application submitted successfully! Check your dashboard to see your applications.');
            } else {
                setMessage('Application failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    if (!apprenticeship) return <div>Loading...</div>;

    return (
        <div className="p-6 container bg-[#EAD8B1]">
            <h2 className="text-2xl font-bold mb-4">{apprenticeship.title}</h2>
            <p>{apprenticeship.description}</p>
            <button
                onClick={handleApply}
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Apply
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default ApprenticeshipDetailPage;



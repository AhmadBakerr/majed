import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalUsers = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/totalUsers');
                setTotalUsers(response.data.totalUsers);
            } catch (error) {
                console.error('Failed', error);
                setError('Failed');
            }
        };
        fetchTotalUsers();
    }, []);

    return (
        <div className="card text-white bg-black mb-3">
            <div className="card-header"style={{ backgroundColor: '#F26800' }}>Total Users</div>
            <div className="card-body"style={{ backgroundColor: '#F26800' }}>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <h5 className="card-title">{totalUsers}</h5>
                )}
            </div>
        </div>
    );
};

export default TotalUsers;

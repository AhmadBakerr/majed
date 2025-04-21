import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalItems = () => {
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchTotalItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/items/count');
                setTotalItems(response.data.total);
            } catch (error) {
                console.error('Failed to fetch total items', error);
            }
        };
        fetchTotalItems();
    }, []);

    return (
        //https://getbootstrap.com/
        <div className="card text-white bg-black mb-3">
            <div className="card-header"style={{ backgroundColor: '#F26800' }}>Total Items</div>
            <div className="card-body" style={{ backgroundColor: '#F26800' }}>
                <h5 className="card-title">{totalItems}</h5>
            </div>
        </div>
    );
};
export default TotalItems;
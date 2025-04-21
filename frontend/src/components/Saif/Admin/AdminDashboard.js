import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snavbar from './Snavbar';
import TotalUsers from './TotalUsers';
import TotalItems from './TotalItems';
import "./AdminDashboard.css";

const AdminDashboard = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#172026';
        return () => {
          document.body.style.backgroundColor = null;
        };
      }, []);
    return (
        <div style={{ display: 'flex', minHeight: '', }}>
            <div style={{ width: '100px', height: "", flexShrink: 0 }}>
                <Snavbar />
            </div>
            <div className="container mt-5" >
                <h1 className='title-admindash'>Admin Dashboard</h1>

                <div className="row">
                    <div className="col-md-4">
                        <TotalItems />
                    </div>
                    <div className="col-md-4">
                        <TotalUsers />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;

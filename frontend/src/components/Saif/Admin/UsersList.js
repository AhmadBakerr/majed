import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Snavbar from './Snavbar';
import "./AdminDashboard.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = '#172026';
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/firebase-users');
        setUsers(response.data);
    };

    const addUser = async () => {
        await axios.post('http://localhost:5000/add-user', { email, password });
        fetchUsers();
        setEmail('');
        setPassword('');
    };

    const disableUser = async (uid) => {
        await axios.post('http://localhost:5000/disable-user', { uid });
        fetchUsers();
    };

    const enableUser = async (uid) => {
        await axios.post('http://localhost:5000/enable-user', { uid });
        fetchUsers();
    };

    const deleteUser = async (uid) => {
        await axios.delete('http://localhost:5000/delete-user', { data: { uid } });
        fetchUsers();
    };

    const addAdmin = async (uid) => {
        await axios.post('http://localhost:5000/add-admin', { uid });
        fetchUsers();
    };

    const removeAdmin = async (uid) => {
        await axios.post('http://localhost:5000/remove-admin', { uid });
        fetchUsers();
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ width: '100px', flexShrink: 0 }}>
                <Snavbar />
            </div>
            <div className="container mt-5" style={{ flex: 1 }}>
                <h2 className="mb-3 title-admindash">Users Management</h2>
                <form className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label title-admindash">User Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="userEmail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label title-admindash">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="userPassword"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={addUser}>Add User</button>
                </form>

                <div className="mb-3">
                    <label htmlFor="userUid" className="form-label title-admindash">User UID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userUid"
                        value={uid}
                        onChange={e => setUid(e.target.value)}
                        placeholder="Enter UID"
                        required
                    />
                    <div className="mt-3">
                        <button type="button" className="btn btn-success me-2" onClick={() => addAdmin(uid)}>
                            <i className="bi bi-person-plus-fill"></i> Add Admin
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => removeAdmin(uid)}>
                            <i className="bi bi-person-dash-fill"></i> Remove Admin
                        </button>
                    </div>
                </div>

                <ul className="list-group">
                    {users.map(user => (
                        <li key={user.uid} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{user.email}</strong><br />
                                <small>UID: {user.uid}</small><br />
                                <small>Role: {user.customClaims?.admin ? 'Admin' : 'User'}</small><br />
                                <small>Status: {user.disabled ? 'Disabled' : 'Active'}</small>
                            </div>
                            <div>
                                <button className="btn btn-info btn-sm me-2" onClick={() => enableUser(user.uid)}>
                                    <i className="bi bi-unlock"></i> Enable
                                </button>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => disableUser(user.uid)}>
                                    <i className="bi bi-lock"></i> Disable
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.uid)}>
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersList;

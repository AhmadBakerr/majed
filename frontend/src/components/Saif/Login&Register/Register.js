import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../.././firebase-config';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                sendEmailVerification(userCredential.user)
                    .then(() => {
                       
                        updateProfile(userCredential.user, {
                            displayName: username
                        }).then(() => {
                            const userData = {
                                uid: userCredential.user.uid,
                                email: userCredential.user.email,
                                displayName: username
                            };
    
                            axios.post('http://localhost:5000/users/register', userData)
                                .then(() => {
                                    console.log("User saved in MongoDB");
                                   
                                    navigate('/login');
                                })
                                .catch(error => {
                                    setError("Failed to save user data: " + error.message);
                                    console.error("Error saving user to MongoDB:", error.message);
                                });
                        }).catch(error => {
                            setError(error.message);
                            console.error("Error updating user profile:", error.message);
                        });
                    })
                    .catch(error => {
                        setError(error.message);
                        console.error("Error sending email verification:", error.message);
                    });
            })
            .catch(error => {
                setError(error.message);
                console.log("Error in registration:", error.message);
            });
    };
    return (
        <div className="container py-4">
        <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right bg-body-tertiary" style={{backdropFilter: "blur(30px)"}}>
                    <div className="card-body p-5 shadow-5 text-center">
                        <h2 className="fw-bold mb-5">Sign up now</h2>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form onSubmit={register}>
                            <div className="form-outline mb-4">
                            <label className=" ss2" for="username">Username</label>

                                <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-outline mb-4">
                            <label className=" ss2" for="email">Email address</label>

                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-outline mb-4">
                            <label className=" ss2" for="password">Password</label>

                                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
                <img src="https://i.ibb.co/z6TnL5H/tingol.png" className="w-100 rounded-4 shadow-4" alt="logo" />
            </div>
        </div>
    </div>
);
}

export default Register;

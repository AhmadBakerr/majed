import React, { useState } from 'react';
import { auth } from '../.././firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, sendPasswordResetEmail } from 'firebase/auth';
import "./Login.css";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        setError('');
    
        setPersistence(auth, browserLocalPersistence) 
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
            })
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    navigate('/home');
                } else {
                    setError('Please verify your email before logging in.');
                    console.log('Email not verified.');
                }
            })
            .catch((error) => {
                setError(error.message);
                console.log("Login error:", error.message);
            });
    };
    const handleForgotPassword = () => {
        if (!email) { 
            setError("Please enter your email address.");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("Password reset link sent! Check your email.");
            })
            .catch((error) => {
                setError("Failed to send password reset email. " + error.message);
            });
    };
    
    return (
        <div className="container py-4">
            <div className="row g-0 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="card cascading-right bg-body-tertiary" style={{backdropFilter: "blur(30px)"}}>
                        <div className="card-body p-5 shadow-5 text-center">
                            <h2 className="fw-bold mb-5">Login</h2>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={signIn}>
                                <div className="form-outline mb-4">
                                <label className=" ss2" for="email">Email address</label>

                                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-outline mb-4">
                                <label className=" ss2" for="password">Password</label>

                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
                            </form>
                            <hr />
                            <p className="mt-2">Don't have an account? <Link to="/register" className="btn btn-link">Register</Link></p>
                            <button type="button" className="btn btn-link" onClick={handleForgotPassword}>Forgot Password?</button>

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

export default Login;

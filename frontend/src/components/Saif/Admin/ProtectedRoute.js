import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdTokenResult().then((idTokenResult) => {
                    setUser(user);
                    setIsAdmin(!!idTokenResult.claims.admin);
                }).finally(() => setCheckingStatus(false));

                
            } else {
                setUser(null);
                setIsAdmin(false);
                setCheckingStatus(false);
            }
        });
    }, []);

    if (checkingStatus) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute;

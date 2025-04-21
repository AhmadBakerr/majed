import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Saif/Login&Register/Register';
import Login from './components/Saif/Login&Register/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/AhmadBaker/Home';
import BrandItems from './components/AhmadBaker/BrandItems';
import Admin from './components/Saif/Admin/Admin';
import Snavbar from './components/Saif/Admin/Snavbar';
import ProtectedRoute from './components/Saif/Admin/ProtectedRoute'
import ItemDetails from './components/Menna/ItemDetails';
import Cartpage from './components/Nassar/Cartpage';
import UsersList from './components/Saif/Admin/UsersList';
import AdminDashboard from './components/Saif/Admin/AdminDashboard';
import Orders from './components/Saif/Admin/Orders';
import AdminAds from './components/Saif/Admin/AdminAds';
import AdminPoster from './components/Saif/Admin/AdminPoster';
import AdminDB from './components/Saif/Admin/AdminDB';
import Navbar from './components/Omar/Navbar';
import Footer from './components/Omar/Footer';
import Orderhistory from './components/AhmadIR/Orderhistory/Orderhistory'
import Sidbar from './components/AhmadIR/sidebar/Sidbar'
import ProfilePage from './components/Rahaf/ProfilePage';
import HelpPage from './components/Nassar/HelpPage';
import AddressForm from './components/Omar/AddressForm';
//done
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={
                    <div>
                        <Navbar />
                        <Home />
                        <Footer />
                    </div>
                } />
                <Route path="/setting" element={
                    <div>

                        <Sidbar />

                    </div>

                } />
                <Route path="/myorder" element={

                    <div style={{ display: 'flex', minHeight: '', }}>
                        <div style={{}}>
                            <Sidbar />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Orderhistory />
                        </div>
                    </div>
                } />
                <Route path="/ProfilePage" element={

                    <div style={{ display: 'flex', minHeight: '', }}>
                        <div style={{}}>
                            <Sidbar />
                        </div>
                        <div style={{ flex: 1 }}>
                            <ProfilePage />
                        </div>
                    </div>
                } />
                <Route path="/Address" element={

                    <div style={{ display: 'flex', minHeight: '', }}>
                        <div style={{}}>
                            <Sidbar />
                        </div>
                        <div style={{ flex: 1 }}>
                            <AddressForm />
                        </div>
                    </div>
                } />


                <Route path="/brand/:brandName" element={
                    <div>
                        <Navbar />
                        <BrandItems />
                        <Footer />
                    </div>

                } />
                <Route path="/items/:itemId" element={
                    <div>
                        <Navbar />
                        <ItemDetails />
                        <Footer />
                    </div>


                } />
                <Route path="/cart" element={
                    <div>
                        <Navbar />
                        <Cartpage />
                        <Footer />
                    </div>

                } />
                <Route path="/AdminAds" element={<AdminAds />} />
                <Route path="/AdminPoster" element={<AdminPoster />} />
                <Route path="/AdminDB" element={<AdminDB />} />

                <Route path="/UsersList" element={
                    <ProtectedRoute>
                        <UsersList />
                    </ProtectedRoute>
                } />
                <Route path="/AdminDashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/Orders" element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />

                <Route path="/admin" element={
                    <ProtectedRoute>
                        <div style={{ display: 'flex', minHeight: '', }}>
                            <div style={{ width: '100px', height: "", flexShrink: 0 }}>
                                <Snavbar />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Admin />
                            </div>
                        </div>
                    </ProtectedRoute>
                } />

                <Route path="/help" element={
                    <div>
                        <Navbar />
                        <HelpPage />

                        <Footer />
                    </div>
                } />

            </Routes>
        </Router>
    );
}
export default App;
/* Navbar.js*/
import React, { useEffect, useState } from 'react';
import './navbar.css';
import { getAuth } from 'firebase/auth';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import CartButton from '../Nassar/CartButton';
import userIcon from './tingol.png';

function Navbar() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleSignOut = () => {
        auth.signOut();
    };
    const goToCart = () => {
        navigate('/cart');
    };
    const goToAdmin = () => {
        navigate('/AdminDashboard');
    };

    return (
        <nav className="navbar">
            <div className="containers">
                <div className="navbar-links">
                    <a href="/home" className="nav-link">Home</a>
                    <a href="#" className="nav-link">About us</a>
                    <a href="/brand/Apple" className="nav-link">Products</a>
                    <a href="/help" className="nav-link">Help Center</a>
                </div>
                <form className="search-form">
                    <input type="text" placeholder="Search" aria-label="Search" className='se' />
                    <button type="submit" className="search-button">Search</button>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
                            <img src={userIcon} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/profile">
                                <button className='btn'> {auth.currentUser?.displayName || "Guest"}</button>
                            </Dropdown.Item>
                            <Dropdown.Item href="/setting">
                            <a href="/setting" className="btn">Setting</a>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <button onClick={goToAdmin} className="btn">Go to Admin</button>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <button onClick={handleSignOut} className="btn">Sign out</button>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </form>
                <div>
                    <button onClick={handleShowModal} className="btn mb-3" style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <i className="bi bi-cart" style={{ fontSize: '30px', color: '#fff',marginLeft:'20px' }}></i>
                    </button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cart Preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CartButton />
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between">
                            <Button variant="primary" onClick={goToCart}>
                                Cart
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;

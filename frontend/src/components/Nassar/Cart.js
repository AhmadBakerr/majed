import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';
import './Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart({ onTotalChange }) {  
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
        onTotalChange(total);  
    }, [cartItems, onTotalChange]);  

    const removeItemFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    return (
        
        <Container className="cart-container">
            <h1 className="cart-header">Your Cart</h1>
            <Table striped bordered hover className="cart-table">
                <thead>
                    <tr align="center">
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Your cart is empty</td>
                        </tr>
                    ) : (
                        cartItems.map((item) => (
                            <tr align="center" key={item.id}>
                                <td>
                                    <img
                                        src={item.photoUrl}
                                        alt={item.name}
                                        className="table-img"
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>₪{item.price.toFixed(2)}</td>
                                <td>
                                    <Button
                                        className="delete-btn"
                                        onClick={() => removeItemFromCart(item.id)}
                                    >
                                        <Trash3Fill className="delete-btn-icon" />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default Cart;
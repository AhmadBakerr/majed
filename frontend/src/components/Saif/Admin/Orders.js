import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Modal, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Snavbar from './Snavbar';
import "./AdminDashboard.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);
// to fetch orders has been saved from nassar page 
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get('http://localhost:5000/ordersadmin');
      const ordersData = ordersResponse.data;
      const updatedOrders = await Promise.all(ordersData.map(async (order) => {
        const itemsWithPhotos = await Promise.all(order.items.map(async (item) => {
          const itemResponse = await axios.get(`http://localhost:5000/items/${item.id}`);
          const itemData = itemResponse.data;
          return {
            ...item,
            photoUrl: itemData.photoUrl
          };
        }));
  
        return {
          ...order,
          items: itemsWithPhotos
        };
      }));
  
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };
  useEffect(() => {
    document.body.style.backgroundColor = '#172026';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) =>
    order.userName && order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '100px', flexShrink: 0 }}>
        <Snavbar />
      </div>
      <Container>
        <h1 className="mt-5 title-admindash">Orders</h1>
        <Form className="mt-4 mb-4">
          <Form.Control
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userName}</td>
                <td>₪{order.total.toFixed(2)}</td>
                <td>
                  <Button variant="primary" onClick={() => handleOrderClick(order)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={selectedOrder !== null} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
           
          <Modal.Title style={{ color: '#F26800 !important' }}>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>User Name: {selectedOrder?.userName}</h5>
            <h5>Total: ₪{selectedOrder?.total.toFixed(2)}</h5>
            <h5>Items:</h5>
            <ul className="list-group">
              {selectedOrder?.items.map((item) => (
                <li key={item.id} className="list-group-item d-flex align-items-center">
                  <Image src={item.photoUrl} alt={item.name} thumbnail style={{ width: '50px', marginRight: '10px' }} />
                  <div>
                    <h6>{item.name}</h6>
                    <p>₪{item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Orders;

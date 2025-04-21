import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import { FaLink, FaImage, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Snavbar from './Snavbar';
function AdminAds() {
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [ads, setAds] = useState([]);
    const [editingAd, setEditingAd] = useState(null);

    const fetchAds = async () => {
        //to fetch ads from db 
        try {
            const { data } = await axios.get(`http://localhost:5000/api/ads`);
            setAds(data);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
    };
    // background color
    useEffect(() => {
        document.body.style.backgroundColor = '#172026';
        return () => {
          document.body.style.backgroundColor = null;
        };
      }, []);
    useEffect(() => {
        fetchAds();
    }, []);
// for submit the ads 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAd = { imageUrl, link, isVisible };
            if (editingAd) {
                // using if to put or post the ads
                await axios.put(`http://localhost:5000/api/ads/${editingAd._id}`, newAd);
                alert('Ad updated successfully!');
            } else {
                await axios.post(`http://localhost:5000/api/ads`, newAd);
                alert('Ad added successfully!');
            }
            setImageUrl('');
            setLink('');
            setIsVisible(true);
            setEditingAd(null);
            fetchAds();
        } catch (error) {
            console.error('Error adding/updating ad:', error);
            alert('Failed to add/update ad.');
        }
    };
// to hundle ads to edit on it 
    const handleEdit = (ad) => {
        setEditingAd(ad);
        setImageUrl(ad.imageUrl);
        setLink(ad.link);
        setIsVisible(ad.isVisible);
    };
// this is for delete 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/ads/${id}`);
            alert('Ad deleted successfully!');
            fetchAds();
        } catch (error) {
            console.error('Error deleting ad:', error);
            alert('Failed to delete ad.');
        }
    };

    return (// from bootstrap
        <div style={{ display: 'flex', minHeight: '', }}>
             <div style={{ width: '100px', height: "", flexShrink: 0 }}>
                <Snavbar />
            </div>
        <Container className="mt-5" >
           
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                        <h1 className='text-center title-admindash'>AdminAds</h1>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formImageUrl" className="mb-3">
                                    <Form.Label><FaImage className="me-2" />Image URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image URL"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLink" className="mb-3">
                                    <Form.Label><FaLink className="me-2" />Link</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter link"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formIsVisible" className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label={<><FaEye className="me-2" />Visible</>}
                                        checked={isVisible}
                                        onChange={(e) => setIsVisible(e.target.checked)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    {editingAd ? 'Update Ad' : 'Add Ad'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2 className="text-center">Ads List</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Link</th>
                                <th>Visible</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad) => (
                                <tr key={ad._id}>
                                    <td><img src={ad.imageUrl} alt="Ad" style={{ width: '100px' }} /></td>
                                    <td><a href={ad.link} target="_blank" rel="noopener noreferrer">{ad.link}</a></td>
                                    <td>{ad.isVisible ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(ad)}><FaEdit /></Button>
                                        <Button variant="danger" onClick={() => handleDelete(ad._id)}><FaTrash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default AdminAds;

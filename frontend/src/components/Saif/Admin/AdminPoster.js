import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import { FaImage, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Snavbar from './Snavbar';
function AdminPoster() {
    const [imageUrl, setImageUrl] = useState('');
    const [section, setSection] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [posters, setPosters] = useState([]);
    const [editingPoster, setEditingPoster] = useState(null);

    const sections = [
        { value: 'banner', label: 'Banner' },
        { value: 'popular-items', label: 'Popular Items' },
        { value: 'categories', label: 'Categories' },
        { value: 'brands', label: 'Brands' },
        
    ];

    const fetchPosters = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/posters`);
            setPosters(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPosters();
    }, []);
    useEffect(() => {
        document.body.style.backgroundColor = '#172026';
        return () => {
          document.body.style.backgroundColor = null;
        };
      }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPoster = { imageUrl, section, isVisible };
            if (editingPoster) {
                await axios.put(`http://localhost:5000/api/posters/${editingPoster._id}`, newPoster);
                alert('Poster updated');
            } else {
                await axios.post(`http://localhost:5000/api/posters`, newPoster);
                alert('Poster added ');
            }
            setImageUrl('');
            setSection('');
            setIsVisible(true);
            setEditingPoster(null);
            fetchPosters();
        } catch (error) {
            console.error('Error adding/updating poster:', error);
            alert('Failed.');
        }
    };

    const handleEdit = (poster) => {
        setEditingPoster(poster);
        setImageUrl(poster.imageUrl);
        setSection(poster.section);
        setIsVisible(poster.isVisible);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/posters/${id}`);
            alert('Poster deleted ');
            fetchPosters();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '', }}>
        <div style={{ width: '100px', height: "", flexShrink: 0 }}>
           <Snavbar />
       </div>
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h1 className="text-center">Admin Poster</h1>
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
                                <Form.Group controlId="formSection" className="mb-3">
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Section</option>
                                        {sections.map((sec) => (
                                            <option key={sec.value} value={sec.value}>
                                                {sec.label}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                                    {editingPoster ? 'Update Poster' : 'Add Poster'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2 className="text-center">Posters List</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Section</th>
                                <th>Visible</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posters.map((poster) => (
                                <tr key={poster._id}>
                                    <td><img src={poster.imageUrl} alt="Poster" style={{ width: '100px' }} /></td>
                                    <td>{poster.section}</td>
                                    <td>{poster.isVisible ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(poster)}><FaEdit /></Button>
                                        <Button variant="danger" onClick={() => handleDelete(poster._id)}><FaTrash /></Button>
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

export default AdminPoster;

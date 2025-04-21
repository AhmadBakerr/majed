import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DurationSelector from './DurationSelector';
import './ItemDetails.css';
import Comments from '../Nosyba/Comments'
function ItemDetails() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [popularItems, setPopularItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPrice, setSelectedPrice] = useState(item ? item.pricePerDay : 0);

    useEffect(() => {
        // get item by id
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/items/${itemId}`);
                setItem(response.data);
            } catch (error) {
                console.error('erorr', error);
            }
            // call the popular items
            try {
                const response = await axios.get('http://localhost:5000/items/popular');
                setPopularItems(response.data);
            } catch (error) {
                console.error('erorr', error);
            }

            setLoading(false);
        };

        fetchItemDetails();
    }, [itemId, navigate]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    draggable: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    draggable: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                }
            }
        ]
    };

    if (loading) return <p>Loading...</p>;
    if (!item) return <p>Item not found</p>;

    const handleAddToCart = async () => {
        try {
            const user = 'username';
            const response = await axios.post(`http://localhost:5000/cart/add`, {
                userId: user,
                itemId: item._id,
                name: item.name,
                price: selectedPrice,
            });
            console.log('Item added to cart:', response.data);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                id: item._id,
                name: item.name,
                price: selectedPrice,
                photoUrl: item.photoUrl
            });
            localStorage.setItem('cart', JSON.stringify(cart));

            navigate('/cart');
        } catch (error) {
            console.error('erorr', error);
        }
    };


    return (
        <Container className="mt-5 m1">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="d-flex flex-row background-color l1">
                        <div className="w-50">
                            <Card.Img className="left background-color pp" src={item.photoUrl} style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <Card.Body className="w-50 d-flex flex-column justify-content-between r1">
                            <div>
                                <Card.Title className='mtitle'>{item.name}</Card.Title>
                                <DurationSelector prices={{ pricePerDay: item.pricePerDay, pricePerWeek: item.pricePerWeek, pricePerMonth: item.pricePerMonth }} onPriceChange={setSelectedPrice} />
                            </div>
                            <Button variant="btn btn-warning" onClick={handleAddToCart}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                    <Comments itemId={itemId} />
                    <h2 className="mt-4">Popular Items</h2>
                    <Slider {...sliderSettings}>
                        {popularItems.map((popItem) => (
                            <div key={popItem._id} className="px-2" onClick={() => navigate(`/items/${popItem._id}`)}>
                                <div className="card cardv2 ">
                                    <img src={popItem.photoUrl} alt={popItem.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{popItem.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
}

export default ItemDetails;

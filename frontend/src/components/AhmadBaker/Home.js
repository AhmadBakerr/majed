import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "./Home.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Modal } from "react-bootstrap";
import CartButton from '../Nassar/CartButton';
function Home() {
    const [items, setItems] = useState([]);
    const [marches, setMarches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [ads, setAds] = useState([]);
    const [posters, setPosters] = useState([]);
    const visibleItems = items.filter(item => item.isVisible);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${encodeURIComponent(categoryName)}`);
    };

    const handleMarchClick = (brandName) => {
        navigate(`/brand/${brandName}`);
    };

    useEffect(() => {
        const fetchItems = async () => {
            if (!auth.currentUser) {
                console.log("No user logged in");
                return;
            }
            try {
                const { data } = await axios.get(`http://localhost:5000/items`);
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
            setLoading(false);
        };

        const fetchMarches = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/marches`);
                setMarches(response.data);
            } catch (error) {
                console.error('Error fetching marches:', error);
            }
        };

        const fetchAds = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/ads`);
                const visibleAds = response.data.filter(ad => ad.isVisible);  
                setAds(visibleAds);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };

        const fetchPosters = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posters`);
                const visiblePosters = response.data.filter(poster => poster.isVisible);
                setPosters(visiblePosters);
            } catch (error) {
                console.error('Error fetching posters:', error);
            }
        };

        fetchItems();
        fetchMarches();
        fetchAds();
        fetchPosters();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdTokenResult().then((idTokenResult) => {
                    setIsAdmin(!!idTokenResult.claims.admin);
                    fetchItems();
                    fetchMarches();
                    fetchAds();
                    fetchPosters();
                });
            } else {
                setIsAdmin(false);
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSignOut = () => {
        auth.signOut();
    };

    const goToAdmin = () => {
        navigate('/AdminDashboard');
    };

    const itemsByBrand = items.reduce((acc, item) => {
        acc[item.brand] = [...(acc[item.brand] || []), item];
        return acc;
    }, {});

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

    const bannerImages = [
        
        'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2WHc4ixi087lPPRn0lIQJD%2F8af3ebf6f85e6c51029cdefca530f802%2FSamsung.png&w=1920&q=75',
        'https://images.ctfassets.net/6rbx5b6zjte6/2UAOYgWvVvjwkBcJldwg2Z/381d0016a84f2ee6fa14ce397febb3e5/08052024-iPadM4-Onsite-MC1-Desktop-1__1_.jpg?w=1920&h=1920&q=85&fm=webp',
        'https://images.ctfassets.net/6rbx5b6zjte6/7HJVfMzmvVveDihXmJ7I22/3a30a4b90b9d24ab0bb784e75f8798a2/022024-AppleLaunch-MC1-Desktop-EN.png?w=1920&h=1920&q=85&fm=webp',
        'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2xvIUaciprX6kpRugeAaN5%2Fb0d203fffa33d404a62731da77366221%2FApple.png&w=1920&q=75',
        'https://images.ctfassets.net/6rbx5b6zjte6/JFEgJprcGuALb6HcX0cxj/ef631ae7ef7c977e4f0d754e565fb0fb/052024-UEFA2024-Onsite-MC1-Desktop-790x400.png?w=1920&h=1920&q=85&fm=webp'
       
    ];

    const bannerSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <div className='banner'>

            <div className="banner-slider">
                <Slider {...bannerSliderSettings}>
                    {bannerImages.map((image, index) => (
                        <div key={index}>
                            <img className='img2' src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '500px', }} />
                        </div>
                    ))}
                </Slider>
            </div>

            {posters.filter(poster => poster.section === 'banner').map(poster => (
                <div key={poster._id} className="poster">
                    <img src={poster.imageUrl} alt="Poster" className="poster-image" />
                </div>
            ))}

            <div className="ads-section ad-left">
                {ads.slice(0, Math.ceil(ads.length / 2)).map(ad => (
                    <div key={ad._id} className="ad">
                        <a href={ad.link} target="_blank" rel="noopener noreferrer">
                            <img src={ad.imageUrl} alt="Ad" className="ad-image" />
                        </a>
                    </div>
                ))}
            </div>

            <div className="ads-section ad-right">
                {ads.slice(Math.ceil(ads.length / 2)).map(ad => (
                    <div key={ad._id} className="ad">
                        <a href={ad.link} target="_blank" rel="noopener noreferrer">
                            <img src={ad.imageUrl} alt="Ad" className="ad-image" />
                        </a>
                    </div>
                ))}
            </div>

            <div className="container mt-6">
            
            {posters.filter(poster => poster.section === 'popular-items').map(poster => (
                    <div key={poster._id} className="poster">
                        <img src={poster.imageUrl} alt="Poster" className="poster-image" />
                    </div>
                ))}

                <h2>Popular Items</h2>
                <Slider {...sliderSettings}>
                    {loading ? (
                        <p>Loading items...</p>
                    ) : visibleItems.filter(item => item.isPopular).map((item) => (
                        <div key={item._id} className="px-2" onClick={() => navigate(`/items/${item._id}`)}>
                            <div className="card cardv1 custom-card">
                                <img src={item.photoUrl} alt={item.name} className="card-img-top " />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <span className="me-1">
                                                <span style={{ fontSize: '12.8px' }}> from <space></space></span>
                                                <span style={{ fontWeight: 'bold' }}>₪{item.pricePerMonth}</span>
                                                <span style={{ fontSize: '12.8px' }}>/month</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>


                <Slider {...sliderSettings}>
                    {categories.map(category => (
                        <div key={category._id} className="px-2">
                            <div className="card " onClick={() => handleCategoryClick(category.name)}>
                                <img src={category.photoUrl} alt={category.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {posters.filter(poster => poster.section === 'categories').map(poster => (
                    <div key={poster._id} className="poster">
                        <img src={poster.imageUrl} alt="Poster" className="poster-image" />
                    </div>
                ))}

                <h2>Brands</h2>
                <Slider {...sliderSettings}>
                    {marches.map(march => (
                        <div key={march._id} className="px-2" onClick={() => handleMarchClick(march.name)}>
                            <div className="card mc custom-card custom-march-card">
                                <img src={march.photoUrl} alt={march.name} className="card-img-top custom-img" />
                                <div className="card-body d-flex flex-column align-items-center">
                                    <h5 className="card-title text-center">{march.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {posters.filter(poster => poster.section === 'brands').map(poster => (
                    <div key={poster._id} className="poster">
                        <img src={poster.imageUrl} alt="Poster" className="poster-image" />
                    </div>
                ))}

                {Object.keys(itemsByBrand).map((brand) => {
                    const visibleBrandItems = visibleItems.filter(item => item.brand === brand);
                    if (visibleBrandItems.length > 0) {
                        return (
                            <div key={brand}>
                                <h3>{brand}</h3>
                                <Slider {...sliderSettings}>
                                    {visibleBrandItems.map((item) => (
                                        <div key={item._id} className="px-2" onClick={() => navigate(`/items/${item._id}`)}>
                                            <div className="card cardv1 custom-card">
                                                <img src={item.photoUrl} alt={item.name} className="card-img-top " />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className="col">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-1">
                                                                <span style={{ fontSize: '12.8px' }}> from <space></space></span>
                                                                <span style={{ fontWeight: 'bold' }}>₪{item.pricePerMonth}</span>
                                                                <span style={{ fontSize: '12.8px' }}>/month</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default Home;
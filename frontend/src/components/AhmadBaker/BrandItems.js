import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Filter from '../AhmadIR/Filter/Filter';
const brandPosters = {
  Apple: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2xvIUaciprX6kpRugeAaN5%2Fb0d203fffa33d404a62731da77366221%2FApple.png&w=1920&q=75',
  Samsung: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2WHc4ixi087lPPRn0lIQJD%2F8af3ebf6f85e6c51029cdefca530f802%2FSamsung.png&w=1920&q=75',
  Sony: "https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2FDQEJrNKGRjdF8yiby3nzi%2Fdf727fae2e43731d1cbf76d105c22360%2FSony.png&w=1920&q=75",
  LG: "https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F1sFzTwXmAsyjkdEt1JB9EE%2F41f567d8eb8ed2555515fc78d1d2a014%2FLG.png&w=1920&q=75",
  Lenovo: "https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F3pVuAgJ7mGD3LZ3enuSxlD%2F59bd24004eed68a799b0605aa40cdc30%2FLenovo.png&w=1920&q=75",
  Canon: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F1EwwJvdmWVYBWzwQ8UrvNF%2F40255a2bc9738a9afc1c5d8acd556a5e%2FCanon.png&w=1920&q=75',
  Microsoft: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F19W93JaO6FWOcDpsiY3SfX%2Fa3bdd8d911e3eca59fba02043054f6eb%2FMicrosoft.png&w=1920&q=75',
  HP: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2FPC73TtGBLqjtbNF0jvcJz%2Fd66065c69abcc6991da0c6d28c6da01a%2FHP.png&w=1080&q=75',
  Acer: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4Ov46WFy0ryrOyawRnlmTk%2F97c791bf85787c0786a65a7be44279a2%2FAcer.png&w=1080&q=75',
  Xiaomi: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4mQwtoooyJR47U35NSzrY3%2Fec7b50a9843d5e9d145aa292e10617c3%2FXiaomi.png&w=1080&q=75',
};

const categoryImages = {
  iphone: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F3LqxUYXd01JHelOZtUSikU%2F9459bf032930899dea82aba74e87fcac%2FDevices-1.png&w=256&q=75',
  iPad: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F3N9DCyZft9rGGiCFzZswf4%2F61016408257f8be5a396fb91609441db%2FDevices.png&w=256&q=75',
  AppleWatch: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2avM3TOJfxhodi7deQGSTl%2F5ec633cf008bdd263daec1d3ce49b903%2FDevices-6.png&w=256&q=75',
  Mac: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F5XxStwrXvebX3ZpkrZWwN2%2F2f19b5e779a7c85ad924bd8b2b194344%2FDevices-5.png&w=256&q=75',
  AirPods: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F5OKmfy2lOBVp2m7Kehg6dd%2Fc5a2c43f547160977665d021e64c42cd%2FAirPods.png&w=256&q=75',
  HomePod: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2JbRXvxkeTGs5fdZiAFPaJ%2Fdea7eedd8dee75726230745548e3953e%2FDevices-2.png&w=256&q=75',
  Smartphones:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F702jJBH99EhBSITdLfa3Qx%2F6ad71582f71c491f00c213d000e3bdd7%2FDevices.png&w=256&q=75',
  Tablets : 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F2ec4mLAB8l5o27RslAR3Sb%2F2220403e18faa1ea4d7875748c20a224%2FDevices-1.png&w=256&q=75',
  SmartWatch: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F6pe8gR5YHRH7hSPpgOtuuk%2F640db1594e41c7a101089eeb2a1cbc9b%2FSmartwatch___Buds.png&w=256&q=75',
  GalaxyBook:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F674MaPvuli34nrnzHUz13E%2F0c9252a2a6b4a727d29800e9bcb6a7fb%2FDevices-2.png&w=256&q=75',
  TVs:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4uI6Nz0itMgnP60Jq9A4Rg%2F54dcce2f7d0f612fbe47ff7c9bbf4d21%2FDevices-3.png&w=256&q=75',
  HomeAppliances:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2FgxuypAx159yvacXcczlf4%2Fa93d5b11e348bcfb2468bb97ef4c7a95%2FDevices-5.png&w=256&q=75',
  PlayStation:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F1yzNMB78ZCQPch6ArAOoSs%2F681b079e957ab1dedb772720b2e418bf%2FDevices.png&w=256&q=75',
  Cameras:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F3mWCFg3LzWvyGrgyyCE6K9%2F60ce1b6b7356fba4867ad4e7e8ca5a5e%2FDevices-1.png&w=256&q=75',
  Tvs: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4tYSsTAOoKSEqMzqd30tMf%2F86209cdec2f44ed9f1c3a8dedf714f5d%2FDevices-2.png&w=256&q=75',
  HomeAudio:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4i6HREhCzch9UsNRsUJzTw%2Ffcadf76b122e8dee237188e703f68393%2FDevices-3.png&w=256&q=75',
  Headphones: 'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4i6HREhCzch9UsNRsUJzTw%2Ffcadf76b122e8dee237188e703f68393%2FDevices-3.png&w=256&q=75',
  PortableSpeakers:'https://www.grover.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F1kxe1uignlmb%2F4g4TeVdltIIrQjN0dpSvZt%2F02ad11db170e1162cc746a1677c4eef2%2FDevices-4.png&w=256&q=75',
  
};

function BrandItems() {
  const navigate = useNavigate();
  const { brandName } = useParams();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const handleCategoryClick = (category) => {
    const filtered = items.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  const handleClearFilter = () => {
    setFilteredItems(items);
  };

  const handleSortChange = (sortBy) => {
    let sortedItems = [...filteredItems];
    if (sortBy === "highToLow") {
      sortedItems.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
    } else if (sortBy === "lowToHigh") {
      sortedItems.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    }
    setFilteredItems(sortedItems);
  };

  useEffect(() => {
    const fetchItemsByBrand = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/brand/${brandName}`);
        const items = response.data;
        const categories = [...new Set(items.map(item => item.category).filter(category => category))]; 
        setItems(items);
        setCategories(categories);
        setFilteredItems(items);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch items', error);
        setLoading(false);
      }
    };

    fetchItemsByBrand();
  }, [brandName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="filter-section">
      </div>
      <div className="d-flex justify-content-center">
        <img src={brandPosters[brandName]} alt={`${brandName} poster`} style={{ maxWidth: '100%' }} />
      </div>
      <h2 className="text-center mt-5">Categories for {brandName}</h2>
      <div className="row">
        {categories.map((category) => (
          <div key={category} className="col-md-2 mb-3">
            <div className="card h-100" style={{ cursor: 'pointer', backgroundColor: 'whitesmoke' }} onClick={() => handleCategoryClick(category)}>
              <h5 className="text mt-2">{category}</h5>
              <img src={categoryImages[category]} alt={`${category} category`} className="card-img-top" />
              <div className="card-body"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={handleClearFilter}>Clear Filter</button>
        <Filter onSortChange={handleSortChange} />

      </div>

      <h2 className="text-center mt-5">Items for {brandName}</h2>
      <div className="row">
        {filteredItems.map((item) => (
          <div key={item._id} className="col-md-3 mb-3 mt-4">
            <div className="card h-100" style={{ cursor: 'pointer', backgroundColor: 'whitesmoke' }} onClick={() => handleItemClick(item._id)}>
              <img src={item.photoUrl} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-text">
                  <div className="row">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandItems;
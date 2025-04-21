// Footer.js
import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <p>The store Tingo for renting all supplies is the largest in Palestine</p>
      </div>
      <div className="footer-section">
        <h6 className="footer-heading">PRODUCTS</h6>
        <ul>
          <li>Phones, computers and accessories</li>
          <li>Electrical and sports equipment</li>
          <li>Games</li>
        </ul>
      </div>
      <div className="footer-section">
        <h6 className="footer-heading">USEFUL LINKS</h6>
        <ul>
          <li>Pricing</li>
          <li>Settings</li>
          <li>Orders</li>
          <li>Help</li>
        </ul>
      </div>
      <div className="footer-section">
        <h6 className="footer-heading">CONTACT</h6>
        <p><i className="fas fa-home"></i> Palestine, WB, 4100</p>
        <p><i className="fas fa-envelope"></i> info@tingo.com</p>
        <p><i className="fas fa-phone"></i> + 01 234 567 88</p>
        <p><i className="fas fa-print"></i> + 01 234 567 89</p>
      </div>
      <div className="footer-bottom">
        © 2024 Copyright: <a href="https://tingo.com">tingo.com</a>
      </div>
    </footer>
  );
}

export default Footer;
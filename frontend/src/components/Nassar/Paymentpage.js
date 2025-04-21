import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../firebase-config'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Paymentpage.css';

function PaymentPage({ userId, total }) { 
     const [user] = useAuthState(auth);
  const [paymentMethod, setPaymentMethod] = useState('Visa');
  const [paymentDetails, setPaymentDetails] = useState({
    email: '',
    password: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setPaymentDetails({
      ...paymentDetails,
      email: '',
      password: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nameOnCard: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = validateInputs();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
      try {
        const user = auth.currentUser;
        const orderResponse = await fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            userName: user.displayName,
            items: cartItems,
            total
          })
        });
  
        const orderData = await orderResponse.json();
  
        if (orderResponse.ok) {
          // Send email
          const emailResponse = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: user.email,
              userName: user.displayName,
              items: cartItems,
              total
            })
          });
  
          const emailData = await emailResponse.json();
  
          if (emailResponse.ok) {
            handleShow();
            resetPaymentDetails();
            localStorage.removeItem('cart');
          } else {
            console.error('Failed to send email:', emailData);
            alert('Failed to send email.');
          }
        } else {
          console.error('Failed to submit order:', orderData);
          alert('Failed to save order.');
        }
      } catch (error) {
        console.error('Failed to submit order:', error);
        alert('Failed to save order.');
      }
    }
  };
  

  function renderPayPalForm() {
    return (
      <>
        {renderInputField('email', 'Email', 'email')}
        {renderInputField('password', 'Password', 'password')}
      </>
    );
  }

  function renderInputField(id, label, type) {
    const value = paymentDetails[id] || '';
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
          type={type}
          className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
          id={id}
          name={id}
          value={value}
          onChange={handleInputChange}
        />
        {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
      </div>
    );
  }
  function validateInputs() {
    let newErrors = {};
    if (paymentMethod === 'Visa') {
      if (!/^[a-zA-Z ]+$/.test(paymentDetails.nameOnCard)) {
        newErrors.nameOnCard = 'Name on card must only contain letters.';
      }
      if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
        newErrors.cardNumber = 'Card number must be exactly 16 digits.';
      }
      if (!/^(0[1-9]|1[0-2])$/.test(paymentDetails.expiryMonth)) {
        newErrors.expiryMonth = 'Month must be MM format.';
      }
      if (!/^\d{2}$/.test(paymentDetails.expiryYear)) {
        newErrors.expiryYear = 'Year must be YY format.';
      }
      if (!/^\d{3}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = 'CVV must be exactly 3 digits.';
      }
    } else if (paymentMethod === 'PayPal') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(paymentDetails.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.';
      }
    }
    return newErrors;
  }
  
  function resetPaymentDetails() {
    setPaymentDetails({
      email: '',
      password: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nameOnCard: ''
    });
  }
  
  function renderVisaForm() {
    return (
      <>
        {renderInputField('nameOnCard', 'Name on Card', 'text')}
        {renderInputField('cardNumber', 'Card Number', 'text')}
        {renderExpiryDate()}
        {renderInputField('cvv', 'CVV', 'text')}
      </>
    );
  }

  function renderPayPalForm() {
    return (
      <>
        {renderInputField('email', 'Email', 'email')}
        {renderInputField('password', 'Password', 'password')}
      </>
    );
  }

  function renderExpiryDate() {
    return (
      <div className="mb-3">
        <label className="form-label">Expiry Date</label>
        <div className="expiry-wrapper">
          <input
            type="text"
            className={`form-control expiry-input ${errors.expiryMonth ? 'is-invalid' : ''}`}
            id="expiryMonth"
            name="expiryMonth"
            placeholder="MM"
            value={paymentDetails.expiryMonth}
            onChange={handleInputChange}
            maxLength="2"
          />
          <div style={{ padding: '10px 4px' }}>/</div>
          <input
            type="text"
            className={`form-control expiry-input ${errors.expiryYear ? 'is-invalid' : ''}`}
            id="expiryYear"
            name="expiryYear"
            placeholder="YY"
            value={paymentDetails.expiryYear}
            onChange={handleInputChange}
            maxLength="2"
          />
        </div>
      </div>
    );
  }

  function renderInputField(id, label, type) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
          type={type}
          className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
          id={id}
          name={id}
          value={paymentDetails[id]}
          onChange={handleInputChange}
        />
        {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
      </div>
    );
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>The operation succeeded!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="payment-container">
        <h2 className="payment-header">Payment Method</h2>
        <div className="btn-group w-100" role="group">
          <button type="button" className={`btn ${paymentMethod === 'Visa' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handlePaymentSelection('Visa')}>
            Visa
          </button>
          <button type="button" className={`btn ${paymentMethod === 'PayPal' ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => handlePaymentSelection('PayPal')}>
            PayPal
          </button>
        </div>
        <form onSubmit={handleSubmit} className="payment-form mt-3">
          {paymentMethod === 'Visa' ? renderVisaForm() : renderPayPalForm()}
          <button type="submit" className="btn btn-success payment-submit-btn mt-3">Submit Payment</button>
        </form>
      </div>
    </>
  );
}

export default PaymentPage;

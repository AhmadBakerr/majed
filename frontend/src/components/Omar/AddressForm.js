import React from 'react';
import './address.css';


function AddressForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/submit-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Form submission error:', response.statusText);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="billing-body">
      <div className="billing-form-container">
        <form id="billingForm" onSubmit={handleSubmit} className="billing-form">
          <input type="email" id="email" name="email" placeholder="Please enter a valid email address" required />
          <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
          <select id="country" name="country" required>
            <option value="" disabled selected hidden>Select Country</option>
            <option value="US">United States</option>
            <option value="EG">Egypt</option>
            <option value="SA">Saudi Arabia</option>
            <option value="PS">Palestine</option>
            <option value="MA">Morocco</option>
            <option value="IQ">Iraq</option>
            <option value="AE">United Arab Emirates</option>
            <option value="SD">Sudan</option>
            <option value="TN">Tunisia</option>
            <option value="LB">Lebanon</option>
            <option value="JO">Jordan</option>
          </select>
          <input type="text" id="city" name="city" placeholder="City" required />
          <input type="text" id="address1" name="address1" placeholder="Address Line 1" required />
          <input type="text" id="address2" name="address2" placeholder="Address Line 2" />
          <input type="text" id="zip" name="zip" placeholder="Zip Code" required />
          <input type="text" id="state" name="state" placeholder="Notes about delivery" /> 
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
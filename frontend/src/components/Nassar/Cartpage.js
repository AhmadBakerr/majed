import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cartpage.css';
import PaymentPage from './Paymentpage'; 
import Cart from './Cart';

const Cartpage = () => {
  const [total, setTotal] = useState(0);

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  const userId = 'user123'; 

  return (
    <div className='cartpage'>
      <div className="container mt-5 p-3 rounded cart">
        <div className="row">
          <div className="col-md-8">
          <Cart onTotalChange={handleTotalChange} />
          </div>
          <div className="col-md-4">
            <div className="total-section">
              <h4>Total: ₪{total.toFixed(2)}</h4>
              <PaymentPage userId={userId} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
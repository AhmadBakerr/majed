import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartButton.css';
import Cart from './Cart';

const CartButton = () => {
  const [total, setTotal] = useState(0);

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  return (
    <div className='cartpage'>
      <div className="container mt-3 p-3 rounded cart">
        <div className="row">
          <div className="col-md-12">
            <Cart onTotalChange={handleTotalChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartButton;

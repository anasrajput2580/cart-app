import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  const navigate = useNavigate();
  const orderData = JSON.parse(localStorage.getItem('orderData'));

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {orderData ? (
        <div>
          <h3>{orderData.product.name}</h3>
          <p>{orderData.product.description}</p>
          <p>Size: {orderData.size}</p>
          <p>Price: ${orderData.price.toFixed(2)}</p>
          <p>Additional Options: {orderData.addons.join(', ') || 'None'}</p>
        </div>
      ) : (
        <p>No order selected</p>
      )}
      <button onClick={() => navigate('/')}>Back to Product List</button>
    </div>
  );
}

export default OrderSummary;

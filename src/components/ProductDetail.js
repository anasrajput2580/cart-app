import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pizzaData from '../data/pizzaData'; // Import the pizza data

function ProductDetail({ pizzaData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = pizzaData.find((pizza) => pizza.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : null);
  const [selectedPrice, setSelectedPrice] = useState(product ? product.price[0] : null);
  const [selectedAddons, setSelectedAddons] = useState({
    addon1: false,
    addon2: false,
  });

  const handleAddOnChange = (e) => {
    setSelectedAddons({
      ...selectedAddons,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSizeChange = (e) => {
    const sizeIndex = product.sizes.indexOf(e.target.value);
    setSelectedSize(e.target.value);
    setSelectedPrice(product.price[sizeIndex]);
  };

  const calculateTotalPrice = () => {
    let total = selectedPrice;
    if (selectedAddons.addon1) total += product.addOn[0];
    if (selectedAddons.addon2) total += product.addOn[1];
    return total;
  };

  const handleOrder = () => {
    const orderData = {
      product,
      size: selectedSize,
      price: calculateTotalPrice(),
      addons: Object.keys(selectedAddons).filter((key) => selectedAddons[key]),
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/order-summary');
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} />
      <p>{product.description}</p>
      <div>
        <h3>Select Size</h3>
        {product.sizes.map((size, index) => (
          <label key={index}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={handleSizeChange}
            />
            {size}
          </label>
        ))}
      </div>
      <div>
        <h3>Additional Options</h3>
        <label>
          <input
            type="checkbox"
            name="addon1"
            checked={selectedAddons.addon1}
            onChange={handleAddOnChange}
          />
          Extra Toppings
        </label>
        <label>
          <input
            type="checkbox"
            name="addon2"
            checked={selectedAddons.addon2}
            onChange={handleAddOnChange}
          />
          Delivery Service
        </label>
      </div>
      <div>
        <h3>Price: ${calculateTotalPrice().toFixed(2)}</h3>
      </div>
      <button onClick={() => navigate('/')}>Back to Product List</button>
      <button onClick={handleOrder}>Go to Order Summary</button>
    </div>
  );
}

export default ProductDetail;

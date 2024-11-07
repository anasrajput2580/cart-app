import React from 'react';

const PizzaItem = ({ name, img, price, sizes, description }) => {
  return (
    <div className="pizza-item">
      <img src={img} alt={name} className="pizza-item--img" />
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="pizza-item--sizes">
        {sizes.map((size, index) => (
          <span key={index} className="pizza-item--size">
            {size} - ${price[index].toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PizzaItem;

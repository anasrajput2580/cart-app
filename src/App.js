
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaItem from './components/PizzaItem';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail component
import React, { useState } from 'react';
import OrderSummary from './components/OrderSummary';
import pizzaData from './data/pizzaData';
import './App.css';

function App() {
//   const pizzaJson = [
//     {
//       id: 12,
//       name: 'BUSINESS SOLUTION',
//       img: process.env.PUBLIC_URL + '/images/Deal-1.png',
//       price: [20.00, 32.80, 50.80,100.00],
//       sizes: ['320g', '530g', '860g'],
//       addOn:[10,20],
//       description: 'Customized your business ​software applications to fit your ​company’s need.'
//   },
//   {
//       id: 29,
//       name: 'TALENT ACQUISITION',
//       img: process.env.PUBLIC_URL + '/images/Deal-2.png',
//       price: [34.10, 39.80, 67.40, 100.00],
//       sizes: ['320g', '530g', '860g'],
//       description: 'Build your team at lower cost.'
//   },
//   {
//       id: 31,
//       name: 'MARKETING & BRANDING',
//       img: process.env.PUBLIC_URL + '/images/Deal-3.png',
//       price: [30.29, 38.15, 57.49,100.00],
//       sizes: ['320g', '530g', '860g'],
//       description: 'Find and build trust with your ​potential clients'
//   },
//   {
//       id: 45,
//       name: 'THE MORE CLUB',
//       img: process.env.PUBLIC_URL + '/images/Deal-4.png',
//       price: [15.10, 21.50, 32.98,100.00],
//       sizes: ['320g', '530g', '860g'],
//       description: 'Exclusive Social Sports Club for ​Business Leaders.'
//   },
//   {
//       id: 57,
//       name: 'PROJECT MANAGEMENT',
//       img: process.env.PUBLIC_URL + '/images/Deal-5.png',
//       price: [10.19, 15.80, 40.80,100.00],
//       sizes: ['320g', '530g', '860g'],
//       description: 'Turn Goals into realities.'
//   },
//   {
//       id: 60,
//       name: 'BUY A BUSINESS',
//       img: process.env.PUBLIC_URL + '/images/Deal-6.png',
//       price: [48.32, 56.25, 78.99, 100.00],
//       sizes: ['320g', '530g', '860g'],
//       description: 'Discover businesses for sale at ​lower price.'
//   }
// ];

const [selectedPizza, setSelectedPizza] = useState(null);

return (
  <Router>
    <div className="app">
      <h1>Our Deals</h1>
      <Routes>
        <Route path="/" element={
          <div className="pizza-list">
            {pizzaData.map((pizza) => (
            <Link to={`/product/${pizza.id}`} key={pizza.id}>
                <PizzaItem
                  name={pizza.name}
                  img={pizza.img}
                  price={pizza.price}
                  sizes={pizza.sizes}
                  description={pizza.description}
                />
              </Link>
            ))}
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail pizzaData={pizzaData} />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </div>
  </Router>
);
}
export default App;
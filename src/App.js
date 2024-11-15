
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaItem from './components/PizzaItem';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail component
import React, { useState } from 'react';
import OrderSummary from './components/OrderSummary';
import pizzaData from './data/pizzaData';
import './App.css';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Option2 from './components/Option2';
function App() {
  const [activeOption, setActiveOption] = useState('Home'); // Default option

  const renderContent = () => {
    switch (activeOption) {
      case 'Option1':
        return <Content />;
      case 'Option2':
        return <Option2 />;
      case 'Settings':
        
      case 'Notifications':
      
      case 'Messages':
       
      case 'Help':
        
      case 'Logout':
       
      default:
        return <div  style={{ padding: '20px', marginLeft: '20%' }}>Select an option from the menu</div>;
    }
  };


// return (

//   <Router>
//       <div className="app-container">
//       <Navigation />
//       <Content/>
//     </div>
//   </Router>
// );
return (
  <div style={{ display: 'flex' }}>
    {/* Navigation Pane */}
    <Navigation activeOption={activeOption} onOptionClick={setActiveOption} />

    {/* Content Area */}
    <div style={{ padding: '20px', marginLeft: '20%' }}>
      {renderContent()}
    </div>
  </div>
);
}
export default App;
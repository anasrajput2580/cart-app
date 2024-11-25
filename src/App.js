// import React, { useState } from 'react';
// import './App.css';
// import Navigation from './components/Navigation';
// import Content from './components/Content';
// import Option2 from './components/Option2';
// import { TotalCostProvider } from './components/TotalCostContext';
// import LoginForm from './components/LoginForm';


// function App() {

//   const [activeOption, setActiveOption] = useState('Option1'); // Default option
  
//   const renderContent = () => {
//     switch (activeOption) {
//       case 'Option1':
//          return <TotalCostProvider>
//         <Content />
//             </TotalCostProvider>
//       case 'Option2':
//         return      <TotalCostProvider>
//         <Option2 />
//     </TotalCostProvider>
//       case 'Settings':
//         break
//       case 'Notifications':
//         break
//       case 'Messages':
//         break
//       case 'Help':
//         break
//       case 'Logout':
//         break
//       default:
//         return <div  style={{ padding: '20px', marginLeft: '20%' }}>Select an option from the menu</div>;
//     }
//   };
// return (
 
//   <div style={{ display: 'flex' }}>
//    <LoginForm/>
//     {/* Navigation Pane */}
//     <Navigation activeOption={activeOption} onOptionClick={setActiveOption} />

//     {/* Content Area */}
//     <div style={{ padding: '20px', marginLeft: '20%' }}>
//       {renderContent()}
//     </div>
//   </div>
// );
// }
// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Option2 from './components/Option2';
import { TotalCostProvider } from './components/TotalCostContext';
import LoginForm from './components/LoginForm';
import MembershipForm from './components/MembershipForm';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeOption, setActiveOption] = useState('Option1');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activeOption) {
      case 'Option1':
        return (
          <TotalCostProvider>
            <Content />
          </TotalCostProvider>
        );
      case 'Option2':
        return (
          <TotalCostProvider>
            <Option2 />
          </TotalCostProvider>
        );
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <NavigateToDashboard /> : <LoginForm onLogin={handleLogin} />
          }
        />

        {/* Membership Form Route */}
        <Route path="/membership" element={<MembershipForm />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <div style={{ display: 'flex' }}>
                <Navigation activeOption={activeOption} onOptionClick={setActiveOption} />
                <div style={{ padding: '20px', marginLeft: '20%' }}>{renderContent()}</div>
              </div>
            ) : (
              <LoginRedirect />
            )
          }
        />
      </Routes>
    </Router>
  );
}

// Component to navigate logged-in users to the dashboard
function NavigateToDashboard() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  return null;
}

// Component to redirect non-logged-in users back to login
function LoginRedirect() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);
  return null;
}

export default App;

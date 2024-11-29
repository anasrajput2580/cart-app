// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';
// import Navigation from './components/Navigation';
// import Content from './components/Content';
// import Option2 from './components/Option2';
// import { TotalCostProvider} from './components/TotalCostContext';
// import LoginForm from './components/LoginForm';
// import MembershipForm from './components/MembershipForm';
// import ForgotPassword from './components/ForgotPassword';
// import { saveSelection, loadSelection } from './services/apiService'
// //import { saveSelection } from './components/TotalCostContext';
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [activeOption, setActiveOption] = useState('Option1');
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   //const navigate = useNavigate();
//   const handleLogin =  async() => {
//     setIsLoggedIn(true);
//     await handleLoadSelections();
//   };

//   const handleLoadSelections = async () => {
//     const userId = 1; // Replace with actual user ID
//     const data = await loadSelection(userId);
//     setSelectedOptions(data.selectedOptions);
//     setTotalPrice(data.totalPrice);
//   };
//   const handleSaveSelections = async () => {
//     const userId = 1; // Replace with actual user ID
//     await saveSelection(userId, selectedOptions, totalPrice);
//   };
//   const handleLogout = () => {
//     handleSaveSelections();
//     //navigate("/");
//     //LoginRedirect();
//     // setIsLoggedIn(false);

// };
//   const renderContent = () => {
//     switch (activeOption) {
//       case 'Option1':
//         return (
//           <TotalCostProvider>
//             <Content 
//             selectedOptions={selectedOptions}
//             setSelectedOptions={setSelectedOptions}
//             totalPrice={totalPrice}
//             setTotalPrice={setTotalPrice}
//             />
//           </TotalCostProvider>
//         );
//       case 'Option2':
//         return (
//           <TotalCostProvider>
//             <Option2 
//              selectedOptions={selectedOptions}
//              setSelectedOptions={setSelectedOptions}
//              totalPrice={totalPrice}
//              setTotalPrice={setTotalPrice}
//             />
//           </TotalCostProvider>
//         );
//         case 'Save':
//           return (
//             handleSaveSelections()
//           );
//         case 'Logout':
//           return (
//             handleLogout()
//           );
  
//       default:
//         return <div>Select an option from the menu</div>;
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Login Route */}
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? <NavigateToDashboard /> : <LoginForm onLogin={handleLogin} />
//           }
//         />

//         {/* Membership Form Route */}
//         <Route path="/membership" element={<MembershipForm />} />

//         {/* Forgot Password Route */}
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Dashboard Route */}
//         <Route
//           path="/dashboard"
//           element={
//             isLoggedIn ? (
//               <div style={{ display: 'flex' }}>
//                 <Navigation activeOption={activeOption} onOptionClick={setActiveOption} />
//                 <div style={{ padding: '20px', marginLeft: '20%' }}>{renderContent()}</div>
//               </div>
//             ) : (
//               <LoginRedirect />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// // Component to navigate logged-in users to the dashboard
// function NavigateToDashboard() {
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     navigate('/dashboard');
//   }, [navigate]);
//   return null;
// }

// // Component to redirect non-logged-in users back to login
// function LoginRedirect() {
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     navigate('/');
//   }, [navigate]);
//   return null;
// }

// export default App;
// src/App.js
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
import { saveSelection, loadSelection } from './services/apiService';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeOption, setActiveOption] = useState('Option1');
    const initialSelectedOptions = {
        'Aetna Basic22': null,
        'Aetna Basic Plus22': null,
        'Aetna Basic Premium22': null
    };
    
    const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
    
   // const [selectedOptions, setSelectedOptions] = useState({});
    const [totalPrice, setTotalPrice] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleLogin = async (id) => {
        setIsLoggedIn(true);
        setUserId(id);
        await handleLoadSelections(id);
    };

    const handleLoadSelections = async (id) => {
        const data = await loadSelection(id);
        setSelectedOptions(data.selectedOptions || {});
        setTotalPrice(data.totalPrice || 0);
    };

    const handleSaveSelections = async () => {
        if (!userId) {
            alert('No user ID available.');
            return;
        }
        if (Object.keys(selectedOptions).length === 0) {
            alert('No selections made to save.');
            return;
        }
        console.log('Payload before saving:', { userId, selectedOptions, totalPrice });
        try {
            await saveSelection(userId, selectedOptions, totalPrice);
            alert('Selections saved successfully!');
        } catch (error) {
            console.error('Error saving selections:', error);
            alert('Failed to save selections.');
        }
    };
    
    const handleLogout = async () => {
        await handleSaveSelections();
        setIsLoggedIn(false);
        setUserId(null);
        setSelectedOptions({});
        setTotalPrice(0);
    };

    const renderContent = () => {
        switch (activeOption) {
            case 'Option1':
                return (
                    <TotalCostProvider>
                        <Content
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                        />
                    </TotalCostProvider>
                );
            case 'Option2':
                return (
                    <TotalCostProvider>
                        <Option2
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                        />
                    </TotalCostProvider>
                );
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? <NavigateToDashboard /> : <LoginForm onLogin={handleLogin} />
                    }
                />
                <Route path="/membership" element={<MembershipForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <div style={{ display: 'flex' }}>
                                <Navigation
                                    activeOption={activeOption}
                                    onOptionClick={setActiveOption}
                                    onSave={handleSaveSelections}
                                    onLogout={handleLogout}
                                />
                                <div style={{ padding: '20px', marginLeft: '20%' }}>
                                    {renderContent()}
                                </div>
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


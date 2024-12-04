import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import MembershipForm from './components/Auth/MembershipForm';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import MoreDetails from './components/Insurance/OptionalDetail';
import './App.module.css';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<MembershipForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/details/:id" element={<MoreDetails />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
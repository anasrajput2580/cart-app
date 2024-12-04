import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokenToLocalStorage, removeTokenFromLocalStorage, getTokenFromLocalStorage } from '../utils/tokenUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    token: getTokenFromLocalStorage(),
    userId: localStorage.getItem('userId') || null,
  });

  useEffect(() => {
    // Optionally verify token validity here
  }, []);

  const login = (token, userId) => {
    saveTokenToLocalStorage(token);
    localStorage.setItem('userId', userId);
    setAuthState({ token, userId });
    navigate('/dashboard');
  };

  const logout = () => {
    removeTokenFromLocalStorage();
    localStorage.removeItem('userId');
    setAuthState({ token: null, userId: null });
    navigate('/login');
  };

  const isAuthenticated = () => !!authState.token;

  return (
    <AuthContext.Provider value={{ authState, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
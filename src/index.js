import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SelectionProvider } from './context/SelectionContext';
import './index.module.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SelectionProvider>
          <App />
        </SelectionProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
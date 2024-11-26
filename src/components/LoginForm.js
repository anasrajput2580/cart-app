import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login credentials to backend (Node.js API with MySQL)
      const response = await fetch("membershipserver-v3ogbq0u.b4a.run/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }), // Send email & password to the server
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Login successful!");
          onLogin(username, password); // Handle login state on the frontend
          // Save the authentication token (if available) in local storage or context
          localStorage.setItem("authToken", data.token);
          navigate("/dashboard"); // Redirect user to dashboard after successful login
        } else {
          alert(data.message || "Invalid credentials.");
        }
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Styles for the form
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f8b400, #f06d06)',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#333333',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '0.5rem 0',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#f8b400',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem',
  
  };

  const linkStyle = {
    color: '#f06d06',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/membership')}
          style={{ ...buttonStyle, marginTop: '1rem', marginLeft:'1rem' }}
        >
          Get Membership
        </button>
        <a
          href="#!"
          onClick={() => navigate('/forgot-password')}
          style={linkStyle}
        >
          Forgot Password?
        </a>
      </form>
    </div>
  );
}

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { BACKEND_URL } from '../../config';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleValidation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/validate-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });

      if (response.ok) {
        setStep(2);
        setMessage('');
      } else {
        setMessage('Invalid email or username.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setMessage('Password successfully updated. You can now log in.');
        setStep(3);
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleValidation} className={styles.form}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          {message && <span className={styles.message}>{message}</span>}
          <button type="submit" className={styles.button}>
            Validate
          </button>
        </form>
      );
    } else if (step === 2) {
      return (
        <form onSubmit={handlePasswordReset} className={styles.form}>
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={styles.input}
          />
          {message && <span className={styles.message}>{message}</span>}
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
      );
    } else if (step === 3) {
      return (
        <div className={styles.successMessage}>
          <p>{message}</p>
          <button onClick={() => navigate('/login')} className={styles.button}>
            Go to Login
          </button>
        </div>
      );
    }
  };

  return <div className={styles.formContainer}>{renderStep()}</div>;
};

export default ForgotPassword;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './MembershipForm.module.css';
import { BACKEND_URL } from '../../config';

const MembershipForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cellno, setCellno] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = 'Name is required.';
    else if (name.length < 3) validationErrors.name = 'Name must be at least 3 characters.';

    if (!email) validationErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = 'Invalid email address.';

    if (!password) validationErrors.password = 'Password is required.';
    else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters.';

    return validationErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, cellno }),
        });

        if (response.ok) {
          alert('Membership created successfully!');
          navigate('/login');
        } else {
          const errorText = await response.text();
          alert(`Error: ${errorText}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSignUp} className={styles.form}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
        <input
          type="text"
          placeholder="Cell Number"
          value={cellno}
          onChange={(e) => setCellno(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
        <div className={styles.links}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default MembershipForm;
import React from 'react';
import styles from './Input.css';

const Input = ({ type = 'text', value, onChange, placeholder, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
      {...props}
    />
  );
};

export default Input;
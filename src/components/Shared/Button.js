import React from 'react';
import styles from './Button.css';

const Button = ({ onClick, children, type = 'button', ...props }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
import React from 'react';
import styles from './InsuranceCard.module.css';

const InsuranceCard = ({ title, description, options, link, selectedOption, onOptionChange }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.options}>
        {options.map((option, index) => (
          <label key={index} className={styles.optionLabel}>
            <input
              type="radio"
              name={title}
              value={option.label}
              checked={selectedOption?.label === option.label}
              onChange={() => onOptionChange(option)}
            />
            {option.label} (${option.price})
          </label>
        ))}
      </div>
      <a href={link} className={styles.detailsLink}>
        More Details
      </a>
    </div>
  );
};

export default InsuranceCard;
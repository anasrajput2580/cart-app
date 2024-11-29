// src/components/InsuranceCard.js
import React from 'react';

const InsuranceCard = ({ 
    title, 
    description, 
    options, 
    link, 
    selectedOption, 
    onOptionChange, 
}) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.description}>
                {description} <a href={link}>Read more</a>
            </p>
            <div style={styles.costTitle}>Cost per Paycheck</div>
            <form>
                {options.map((option, index) => (
                    <div key={index} style={styles.optionRow}>
                        <label>
                            <input
                                type="radio"
                                name={`coverage-${title}`}
                                value={option.label}
                                checked={selectedOption?.label === option.label}
                                onChange={() => onOptionChange(option)}
                            />
                            {option.label}
                        </label>
                        <span style={styles.price}>{option.price}</span>
                    </div>
                ))}
            </form>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '15px',
        width: '300px',
        backgroundColor: '#f9f9f9',
        margin: '10px'
    },
    title: {
        backgroundColor: '#003366',
        color: '#ffffff',
        padding: '10px',
        fontSize: '18px',
        borderRadius: '5px 5px 0 0'
    },
    description: {
        fontSize: '14px',
        margin: '10px 0'
    },
    costTitle: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    optionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0'
    },
    price: {
        fontWeight: 'bold'
    },
};

export default InsuranceCard;

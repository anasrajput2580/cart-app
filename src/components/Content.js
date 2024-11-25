import React, { useContext } from 'react';
import { TotalCostContext } from './TotalCostContext.js';

const InsuranceCard = ({ 
    title, 
    description, 
    options, 
    link, 
    selectedOption, 
    onOptionChange, 
    subtotal 
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
                                checked={selectedOption === option.label}
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

const Content = () => {
    const { totalCost, selectedOptions, updateTotalCost, reset } = useContext(TotalCostContext);

    const plans = [
        {
            title: 'Aetna Basic',
            description: 'The Aetna Basic plan is a supplemental insurance option that pays a fixed dollar amount...',
            options: [
                { label: 'Employee Only', price: '$11.31' },
                { label: 'Employee + Spouse', price: '$23.75' },
                { label: 'Employee + Child(ren)', price: '$22.62' },
                { label: 'Employee + Spouse+Child(ren)', price: '$35.06' }
            ],
            link: '/more-details-basic'
        },
        {
            title: 'Aetna Basic Plus',
            description: 'The Aetna Basic Plus plan is a supplemental insurance option that pays a fixed dollar amount...',
            options: [
                { label: 'Employee Only', price: '$31.16' },
                { label: 'Employee + Spouse', price: '$65.43' },
                { label: 'Employee + Child(ren)', price: '$62.32' },
                { label: 'Employee + Spouse+Child(ren)', price: '$96.59' }
            ],
            link: '/more-details-plus'
        },
        {
            title: 'Aetna Basic Premium',
            description: 'The Aetna Basic Premium plan provides higher coverage for medical expenses...',
            options: [
                { label: 'Employee Only', price: '$50.00' },
                { label: 'Employee + Spouse', price: '$100.00' },
                { label: 'Employee + Child(ren)', price: '$80.00' },
                { label: 'Employee + Spouse+Child(ren)', price: '$120.00' }
            ],
            link: '/more-details-premium'
        }
    ];
    return (
        <div style={styles.container}>
            <div style={styles.totalCost}>
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
            <button style={styles.resetButton} onClick={reset}>Reset</button>
        </div>
        {plans.map((plan, index) => (
            <InsuranceCard
                key={index}
                title={plan.title}
                description={plan.description}
                options={plan.options}
                link={plan.link}
                selectedOption={selectedOptions[plan.title]?.label}
                onOptionChange={(newOption) =>
                    updateTotalCost(plan.title, newOption, selectedOptions[plan.title])
                }
            />
        ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        flexWrap: 'wrap'
    },
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
    subtotal: {
        marginTop: '10px',
        fontSize: '16px',
        color: '#003366'
    },
    totalCost: {
        marginTop: '20px',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#003366',
        textAlign: 'center',
        width: '100%'
    },
    resetButton: {
   
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff6666',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Content;

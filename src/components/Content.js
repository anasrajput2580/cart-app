

// export default Content;
import React, { useState } from 'react';

const InsuranceCard = ({ title, description, options, link, onOptionSelect, selectedOption, onOptionChange }) => {
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
    const [totalCost, setTotalCost] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({
        'Aetna Basic': null,
        'Aetna Basic Plus': null,
        'Aetna Basic Premium': null
    });

    const handleOptionSelect = (amount) => {
        setTotalCost((prevTotal) => prevTotal + amount);
    };

    const handleOptionChange = (planTitle, option) => {
        const previousSelection = selectedOptions[planTitle];
        
        // Deduct the previous option price if there was a previous selection
        if (previousSelection) {
            handleOptionSelect(-parseFloat(previousSelection.price.substring(1)));
        }

        // Update the selected option and add the new option's price
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [planTitle]: option
        }));

        handleOptionSelect(parseFloat(option.price.substring(1)));
    };

    const handleReset = () => {
        setSelectedOptions({
            'Aetna Basic': null,
            'Aetna Basic Plus': null,
            'Aetna Basic Premium': null
        });
        setTotalCost(0);
    };

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
        ,
        {
            title: 'Aetna Standard Premium',
            description: 'The Aetna Basic Premium plan provides higher coverage for medical expenses...',
            options: [
                { label: 'Employee Only', price: '$50.00' },
                { label: 'Employee + Spouse', price: '$100.00' },
                { label: 'Employee + Child(ren)', price: '$80.00' },
                { label: 'Employee + Spouse+Child(ren)', price: '$120.00' }
            ],
            link: '/more-details-premium'
        } ,
        {
            title: 'Aetna hh Premium',
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
            {plans.map((plan, index) => (
                <InsuranceCard
                    key={index}
                    title={plan.title}
                    description={plan.description}
                    options={plan.options}
                    link={plan.link}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={selectedOptions[plan.title]?.label}
                    onOptionChange={(option) => handleOptionChange(plan.title, option)}
                />
            ))}
            <div style={styles.totalCost}>
                <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                <button style={styles.resetButton} onClick={handleReset}>Reset</button>
            </div>
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
    totalCost: {
        marginTop: '20px',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#003366',
        textAlign: 'center',
        width: '100%'
    },
    resetButton: {
        marginTop: '10px',
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

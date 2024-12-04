import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import InsuranceCard from './InsuranceCard';
import styles from './Option.module.css';

const Option1 = ({ activeOption }) => {
  const { selectedOptions, updateSelection, resetSelections, totalCost } = useContext(SelectionContext);

  const plans = [
    {
      title: 'Aetna Basic',
      description: 'The Aetna Basic plan is a supplemental insurance option that pays a fixed dollar amount...',
      options: [
        { label: 'Employee Only', price: '11.31' },
        { label: 'Employee + Spouse', price: '23.75' },
        { label: 'Employee + Child(ren)', price: '22.62' },
        { label: 'Employee + Spouse+Child(ren)', price: '35.06' },
      ],
      link: '/more-details-basic',
    },
    // Add more plans as needed
  ];

  return (
    <div className={styles.contentContainer}>
      <div className={styles.totalCost}>
        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        <button className={styles.resetButton} onClick={resetSelections}>
          Reset
        </button>
      </div>
      <div className={styles.plans}>
        {plans.map((plan, index) => (
          <InsuranceCard
            key={index}
            title={plan.title}
            description={plan.description}
            options={plan.options}
            link={plan.link}
            selectedOption={selectedOptions[plan.title]}
            onOptionChange={(option) => updateSelection(plan.title, option)}
          />
        ))}
      </div>
    </div>
  );
};

export default Option1;
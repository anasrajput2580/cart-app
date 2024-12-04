import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import InsuranceCard from './InsuranceCard';
import styles from './Option.module.css';

const Option2 = ({ activeOption }) => {
  const { selectedOptions, updateSelection, resetSelections, totalCost } = useContext(SelectionContext);

  const plans = [
    {
      title: 'Aetna Basic22',
      description: 'The Aetna Basic plan is a supplemental insurance option that pays a fixed dollar amount...',
      options: [
        { label: 'Employee Only', price: '11.31' },
        { label: 'Employee + Spouse', price: '23.75' },
        { label: 'Employee + Child(ren)', price: '22.62' },
        { label: 'Employee + Spouse+Child(ren)', price: '35.06' }
      ],
      link: '/more-details-basic'
    },
    {
      title: 'Aetna Basic Plus22',
      description: 'The Aetna Basic Plus plan is a supplemental insurance option that pays a fixed dollar amount...',
      options: [
        { label: 'Employee Only', price: '31.16' },
        { label: 'Employee + Spouse', price: '65.43' },
        { label: 'Employee + Child(ren)', price: '62.32' },
        { label: 'Employee + Spouse+Child(ren)', price: '96.59' }
      ],
      link: '/more-details-plus'
    },
    {
      title: 'Aetna Basic Premium22',
      description: 'The Aetna Basic Premium plan provides higher coverage for medical expenses...',
      options: [
        { label: 'Employee Only', price: '50.00' },
        { label: 'Employee + Spouse', price: '100.00' },
        { label: 'Employee + Child(ren)', price: '80.00' },
        { label: 'Employee + Spouse+Child(ren)', price: '120.00' }
      ],
      link: '/more-details-premium'
    }
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

export default Option2;
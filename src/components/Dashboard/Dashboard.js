import React, { useState } from 'react';
import Navigation from '../Layout/Navigation';
import { Option1, Option2 } from '../Insurance';
import Header from '../Layout/Header';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState('Option1');

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navigation activeOption={activeOption} onOptionClick={handleOptionClick} />
      <div className={styles.mainContent}>
        <Header />
        {activeOption === 'Option1' && <Option1 activeOption={activeOption} />}
        {activeOption === 'Option2' && <Option2 activeOption={activeOption} />}
      </div>
    </div>
  );
};

export default Dashboard;
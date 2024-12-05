import React, { useState,useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import { AuthContext } from '../../context/AuthContext';
import styles from './Navigation.module.css';

const Navigation = ({ activeOption, onOptionClick }) => {
  const { handleSaveSelections } = useContext(SelectionContext);
  const { logout } = useContext(AuthContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5'];

  return (
    <>
      {/* Toggle Button */}
      <button className="toggleButton" onClick={togglePanel}>
                       ☰
      </button>

      {/* Sidepanel */}
      <div className={`${styles.navPane} ${isPanelOpen ? styles.show : ""}`}>
        <h3>Menu</h3>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <button
              className={activeOption === option ? styles.activeButton : styles.button}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </button>
          </li>
        ))}
        <li>
          <button className={styles.button} onClick={handleSaveSelections}>
            Save Selections
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Navigation;
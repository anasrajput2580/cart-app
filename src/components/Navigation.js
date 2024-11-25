import React from "react";
import "./Navigation.css";

const Navigation = ({ activeOption, onOptionClick }) => {
    const options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6', 'Option7'];
   
    return (
        <div className="nav-pane">
          <h3>Menu</h3>
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => onOptionClick(option)} // Pass the option value
                className={activeOption === option ? 'active' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
  );
};
export default Navigation;

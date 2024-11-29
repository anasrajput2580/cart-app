import React from "react";
import "./Navigation.css";

const Navigation = ({ activeOption, onOptionClick, onSave, onLogout }) => {
    const options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Save', 'Logout'];
   
    return (
        <div className="nav-pane">
          <h3>Menu</h3>
           <ul style={styles.ul}>
                <li style={styles.li}>
                    <button
                        style={activeOption === 'Option1' ? styles.activeButton : styles.button}
                        onClick={() => onOptionClick('Option1')}
                    >
                        Option1
                    </button>
                </li>
                <li style={styles.li}>
                    <button
                        style={activeOption === 'Option2' ? styles.activeButton : styles.button}
                        onClick={() => onOptionClick('Option2')}
                    >
                        Option2
                    </button>
                </li>
                <li style={styles.li}>
                    <button style={styles.button} onClick={onSave}>
                        Save Selections
                    </button>
                </li>
                <li style={styles.li}>
                    <button style={styles.button} onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
  );
};
const styles = {

  button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
  },
  activeButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#0056b3',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
  },
};

export default Navigation;

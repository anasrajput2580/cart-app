import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './OptionalDetails.module.css';

const OptionalDetail = () => {
  const { id } = useParams();

  // Placeholder data; in a real application, fetch details based on ID
  const item = {
    title: `Insurance Plan ${id}`,
    image: `/images/plan${id}.png`,
    description: `Detailed information about Insurance Plan ${id}.`,
  };

  return (
    <div className={styles.detailsPage}>
      <header className={styles.header}>
        <h1>{item.title}</h1>
        <nav className={styles.nav}>
          <Link to="/dashboard">Home</Link> &gt; <span>{item.title}</span>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.media}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={styles.info}>
          <h2>Details</h2>
          <p>{item.description}</p>
          <button onClick={() => window.history.back()} className={styles.backButton}>
            Go Back
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Related Items</p>
        {/* Add related items logic here */}
      </footer>
    </div>
  );
};

export default OptionalDetail;

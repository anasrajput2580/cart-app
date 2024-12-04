import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './MoreDetails.module.css';

const MoreDetails = ({ item }) => {
  const { id } = useParams();

  // Placeholder data; in a real application, fetch details based on ID
  const insuranceDetails = {
    title: `Detailed Insurance Plan ${id}`,
    image: `/images/plan${id}.jpg`,
    description: `This is a detailed description of Insurance Plan ${id}. It covers various aspects such as...`,
  };

  return (
    <div className={styles.detailsPage}>
      <header className={styles.header}>
        <h1>{insuranceDetails.title}</h1>
        <nav className={styles.nav}>
          <Link to="/dashboard">Home</Link> &gt; <span>{insuranceDetails.title}</span>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.media}>
          <img src={insuranceDetails.image} alt={insuranceDetails.title} />
        </div>
        <div className={styles.info}>
          <h2>Details</h2>
          <p>{insuranceDetails.description}</p>
          <button onClick={() => window.history.back()} className={styles.backButton}>
            Go Back
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Related Insurance Plans</p>
        {/* Add related items logic here */}
      </footer>
    </div>
  );
};

export default MoreDetails;
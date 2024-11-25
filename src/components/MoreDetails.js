import React from 'react';

const MoreDetails = ({ item }) => {
  return (
    <div className="details-page">
      <header className="details-header">
        <h1>{item.title}</h1>
        <nav>
          <a href="/">Home</a> &gt; <a href="/category">Category</a> &gt; {item.title}
        </nav>
      </header>

      <main className="details-main">
        <div className="details-media">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="details-info">
          <h2>Details</h2>
          <p>{item.description}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </main>

      <footer className="details-footer">
        <p>Related Items</p>
        {/* Add related items logic */}
      </footer>
    </div>
  );
};

export default MoreDetails;

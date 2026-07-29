import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <div className="home-content">
        <h1>Welcome to WorkHub</h1>
        <p>Your all-in-one employee management platform.</p>
        <p>Manage employee records, track your team, and streamline HR tasks — all in one place.</p>
        <Link to="/login">
          <button className="page-button" style={{ backgroundColor: '#1e3a5f', marginTop: '20px' }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
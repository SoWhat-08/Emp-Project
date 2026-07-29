import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeToday: 0,
    departments: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="page dashboard-page">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Overview of your organization</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>{stats.totalEmployees}</h2>
            <p>Total Employees</p>
          </div>
          <div className="dashboard-card">
            <h2>{stats.activeToday}</h2>
            <p>Active Today</p>
          </div>
          <div className="dashboard-card">
            <h2>{stats.departments}</h2>
            <p>Departments</p>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link to="/employees">
            <button className="page-button" style={{ backgroundColor: '#ea580c' }}>
              View Employee List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
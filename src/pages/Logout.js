import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="page logout-page">
      <div className="logout-box">
        <h1>Logged Out</h1>
        <p>You have been successfully logged out of WorkHub.</p>
        <Link to="/login">
          <button onClick={() => navigate('/login')}>Login Again</button>
        </Link>
      </div>
    </div>
  );
}

export default Logout;
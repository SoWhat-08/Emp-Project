import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function DeleteEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setEmployee(data);
        } else {
          setError('Employee not found');
        }
      } catch (err) {
        setError('Unable to connect to server.');
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        navigate('/employees');
      } else {
        setError('Failed to delete employee.');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    }
  };

  return (
    <div className="page delete-employee-page">
      <div className="form-box delete-employee-box">
        <h1>Delete Employee</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {employee ? (
          <>
            <p>
              Are you sure you want to delete <strong>{employee.name}</strong> ({employee.email})?
            </p>
            <p>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={handleDelete}>Yes, Delete</button>
              <Link to="/employees">
                <button style={{ backgroundColor: '#374151' }}>Cancel</button>
              </Link>
            </div>
          </>
        ) : (
          !error && <p>Loading employee details...</p>
        )}
      </div>
    </div>
  );
}

export default DeleteEmployee;
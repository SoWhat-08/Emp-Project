import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchEmployees(token);
  }, [navigate]);

  const fetchEmployees = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
      } else {
        setError(data.message || 'Failed to load employees');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
      }
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  return (
    <div className="page employee-list-page">
      <div className="employee-list-box">
        <h1>Employee List</h1>
        <p>All registered employees</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4">No employees found.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <Link to={`/edit-employee/${emp.id}`}>
                      <button style={{ backgroundColor: '#ca8a04', marginRight: '8px' }}>
                        Edit
                      </button>
                    </Link>
                    <button
                      style={{ backgroundColor: '#dc2626' }}
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '30px' }}>
          <Link to="/add-employee">
            <button className="page-button" style={{ backgroundColor: '#0f766e' }}>
              Add New Employee
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
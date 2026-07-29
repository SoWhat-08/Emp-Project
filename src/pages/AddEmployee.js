import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Employee added successfully!');
        setFormData({ name: '', email: '', department: '' });
        setTimeout(() => navigate('/employees'), 1200);
      } else {
        setError(data.message || 'Failed to add employee');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    }
  };

  return (
    <div className="page add-employee-page">
      <div className="form-box add-employee-box">
        <h1>Add Employee</h1>
        <p>Enter new employee details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Employee</button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <p style={{ marginTop: '20px' }}>
          <Link to="/employees">Back to Employee List</Link>
        </p>
      </div>
    </div>
  );
}

export default AddEmployee;
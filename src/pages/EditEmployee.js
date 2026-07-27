import { useState } from 'react';

function EditEmployee() {
  const [message, setMessage] = useState('');

  const handleEditEmployee = (e) => {
    e.preventDefault();
    setMessage('Employee details updated successfully!');
  };

  return (
    <div className="page edit-employee-page">
      <div className="form-box edit-employee-box">
        <h1>Edit Employee</h1>

        <p>Update employee information.</p>

        <form onSubmit={handleEditEmployee}>
          <input
            type="text"
            placeholder="Employee ID"
            required
          />

          <input
            type="text"
            placeholder="Employee Name"
            required
          />

          <input
            type="email"
            placeholder="Employee Email"
            required
          />

          <input
            type="text"
            placeholder="Department"
            required
          />

          <input
            type="text"
            placeholder="Job Position"
            required
          />

          <button type="submit">
            Update Employee
          </button>
        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EditEmployee;
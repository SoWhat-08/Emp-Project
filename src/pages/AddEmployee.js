import { useState } from 'react';

function AddEmployee() {
  const [message, setMessage] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setMessage('Employee added successfully!');
  };

  return (
    <div className="page add-employee-page">
      <div className="form-box add-employee-box">
        <h1>Add Employee</h1>

        <p>Add a new employee to WorkHub.</p>

        <form onSubmit={handleAddEmployee}>
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
            Add Employee
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

export default AddEmployee;
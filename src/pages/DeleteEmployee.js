import { useState } from 'react';

function DeleteEmployee() {
  const [message, setMessage] = useState('');

  const handleDeleteEmployee = (e) => {
    e.preventDefault();
    setMessage('Employee deleted successfully!');
  };

  return (
    <div className="page delete-employee-page">
      <div className="form-box delete-employee-box">
        <h1>Delete Employee</h1>

        <p>Enter the Employee ID to delete an employee.</p>

        <form onSubmit={handleDeleteEmployee}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            required
          />

          <button type="submit">
            Delete Employee
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

export default DeleteEmployee;
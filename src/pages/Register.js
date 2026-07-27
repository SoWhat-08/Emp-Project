import { useState } from 'react';

function Register() {
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('Registration successful!');
  };

  return (
    <div className="page register-page">
      <div className="form-box register-box">
        <h1>Create WorkHub Account</h1>

        <p>Register a new account</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Full Name"
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
          />

          <button type="submit">
            Register
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

export default Register;
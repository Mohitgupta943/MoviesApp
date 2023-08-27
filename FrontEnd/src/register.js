import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles/register.css'; // Import your CSS file for registration

function Registration() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for registration success
  const navigate = useNavigate(); // Create a navigation function

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here, e.g., send the data to a backend API
    // For this example, we'll just simulate a successful registration
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate registration success and show alert
    setRegistrationSuccess(true);

    // Automatically hide the alert after a few seconds
    setTimeout(() => {
      setRegistrationSuccess(false);
      // Navigate to the login component after registration success
      navigate('/login');
    }, 3000); // Hide the alert and navigate after 3 seconds (adjust as needed)
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="button-group" type="submit">
          Register
        </button>
      </form>
      {registrationSuccess && (
        <div className="registration-success">
          Registration successful. Redirecting to login...
        </div>
      )}
    </div>
  );
}

export default Registration;

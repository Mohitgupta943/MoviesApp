import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
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
    // Add your login logic here, e.g., send the data to a backend API
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate login success and show alert
    setLoginSuccess(true);

    // Automatically hide the alert after a few seconds
    setTimeout(() => {
      setLoginSuccess(false);
      // Navigate to the homepage after login success
      navigate('/');
    }, 3000); // Hide the alert and navigate after 3 seconds (adjust as needed)
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          Login
        </button>
      </form>
      {/* Registration button */}
      <Link to="/register" className="button-group1">
        No Account Yet? Register
      </Link>
      {/* Login success alert */}
      {loginSuccess && (
        <div className="login-success">
          Login successful. Redirecting to homepage...
        </div>
      )}
    </div>
  );
}

export default Login;

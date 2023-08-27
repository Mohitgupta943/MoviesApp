import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./styles/Auth.css"

function Header({ searchTerm, onSearchChange, onSearchSubmit, isLoggedIn, onLogout }) {
  return (
    <header>
      <form id="form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          id="search"
          className="search"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </form>
      {/* Use the Link component to navigate to the login page */}
      <Link to="/login" className="login-button">
        {isLoggedIn ? 'Logout' : 'Login'}
      </Link>
      {/* Conditionally render the logout button */}
      {isLoggedIn && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;

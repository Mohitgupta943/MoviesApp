import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Perform logout logic here, e.g., clearing user session or tokens
    // For this example, we'll simulate a logout by using localStorage
    localStorage.removeItem('userToken'); // Remove user token from localStorage

    // Show the alert for 3 seconds and then redirect
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      // Redirect the user to the login page after logging out
      navigate('/login');
    }, 3000); // Show the alert for 3 seconds (adjust as needed)
  }, [navigate]);

  return (
    <div>
      {showAlert && (
        <div className="logout-alert">
          You have been logged out.
        </div>
      )}
    </div>
  );
}

export default Logout;

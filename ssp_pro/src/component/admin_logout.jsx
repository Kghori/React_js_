import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Login from './Login';

function Admin_Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove userId and username from session storage
    // sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');

    // Navigate to the Login component
    navigate('/admin-login');
    window.location.reload();
  };

  // Call handleLogout when the component mounts
  React.useEffect(() => {
    handleLogout();
  }, []);

  // This component doesn't render anything directly, 
  // so you don't need to return anything here

}

export default Admin_Logout;

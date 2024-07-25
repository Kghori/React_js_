import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './admin_home.css';
import { useNavigate } from 'react-router-dom';
import { username } from './session-admin'

function Admin_Sidebar() {
  const navigate = useNavigate();
  // State to manage selected option and username
  const [selectedOption, setSelectedOption] = useState('');
  // const [username, setUsername] = useState('Admin'); // Replace with actual username state management
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
 
      navigate(selectedValue); // Navigate to the selected route
    }
  };
  

  return (
    <>
      <div className="admin-panel">
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><a href="/admin_home" value="" className="active">View Student Data</a></li>
            <li className="dropdown">
              <select onChange={handleChange} value={selectedOption}>
                <option value="">Select an option</option>
                <option value="/admin__mng_st_comple">Internship Completion</option>
                <option value="/admin_add_Completion_form">Add Completion latter </option>
                
              </select>
            </li>
            <li>
  {username ? (
    <>
     <a href="#" style={{ color: 'red' }}>
        Welcome, {username}
      </a>
      <Link to="/admin_logout" className="nav-item nav-link active">Logout</Link>
    </>
  ) : (
    <Link to="/login" className="nav-item nav-link active">Login</Link>
  )}
</li>
          </ul>
        </div>

        {/* Main content
        <div className="main-content">
          <header>
            {username ? (
              <h1>Welcome, {username}!</h1>
            ) : (
              <h1>Welcome! Please login.</h1>
            )}
            <Link to="/admin_logout" className="nav-item nav-link active">Logout</Link>
          </header>
        </div>
    //   </div> */}
    </div>
    </>
  );
}

export default Admin_Sidebar;

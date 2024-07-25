import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index1 = () => {
  return (
    <div className="container">
      <RoleSelector />
    </div>
  );
}

const RoleSelector = () => {
  const [showDropdown, setShowDropdown] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      setShowDropdown(false); // Hide the dropdown
      navigate(selectedValue); // Navigate to the selected route
    }
  };

  return (
    <>
      <style>{`
        .main {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        select {
          padding: 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 200px;
          margin: 0 auto;
        }
        h1 {
          margin-bottom: 20px;
          color: #333;
        }
      `}</style>
      {showDropdown && (
        <div className='main'>
          <div className="dropdown">
            <h1>Select Your Role</h1>
            <select id="roleSelect" onChange={handleChange}>
              <option value="">Choose an option</option>
              <option value="/student">Student</option>
              <option value="/employee">Employee</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Index1;

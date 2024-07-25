import React, { useState, useEffect } from 'react';

const Admin_Login = () => {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const reqData = await fetch("http://localhost/ssp_pro_api/adminlogin.php");
      const resData = await reqData.json();
      console.log(resData.result);
      setUserData(resData.result); // Assuming result is an array of user objects
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const user = userData.find(user => user.a_username == username && user.a_pasword === password);
    // console.log("user"+user.a_username);
    try {
      if (user) {
        console.log("admin name :"+ 
          sessionStorage.setItem('username', user.a_username));
        // console.log("Login success");
        alert("Login Successful!");
        sessionStorage.setItem('username', user.a_username);
        window.location.href = "/admin_home"; 
      } else {
        alert("Login Failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <>
      <style>
        {`
        /* CSS code */
        body, html {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Ensures the container takes the full viewport height */
          background-color: #f0f0f0;
        }

        form {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 300px;
        }

        h2 {
          text-align: center;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .input-group label {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #aaa;
          transition: 0.3s;
        }

        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
          top: -14px;
          left: 10px;
          font-size: 12px;
          color: #333;
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }
        `}
      </style>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <div className="input-group">
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Admin_Login;

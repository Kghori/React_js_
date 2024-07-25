import React from 'react';
import { Link } from 'react-router-dom';
 // Import your Student component


const Index1 = () => {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        // You can use React Router's <Link> to navigate
        // React Router will handle navigation based on the routes defined in your App component
    };

    return (
        <div className="container">
            <h1>Select Your Role</h1>
            <select id="roleSelect" onChange={handleChange}>
                <option value="">Choose an option</option>
                <option value="/student">Student</option>
                <option value="/employee">Employee</option>
            </select>
            {/* Render Student or Employee component based on route */}
            {/* <Student /> and <Employee /> should be rendered inside your Router in App.js */}
        </div>
    );
};

export default Index1;

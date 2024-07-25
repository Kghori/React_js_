import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './admin_home.css';
import Admin_Sidebar from './admin_sidebar';

function Admin_Home() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            navigate(selectedValue); // Navigate to the selected route
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        getUserData();
    }, []);

    // Function to fetch user data from API
    const getUserData = async () => {
        try {
            const response = await axios.get('http://localhost/ssp_pro_api/studentdata.php');
            console.log(response.data.result);
            setUserData(response.data.result); // Assuming result is an array of data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost/ssp_pro_api/studentdata.php/?deid=${id}`);
            console.log(id);
            if (response.data) {
                console.log("Delete data successfully");
                // Update the state by filtering out the deleted user
                setUserData(prevUserData => prevUserData.filter(user => user.id !== id));
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    // Render JSX
    return (
        <>
            <div className="admin-panel">
                <Admin_Sidebar />
                <div className="main-content">
                    <header>
                    </header>
                    <main>
                        <h2>Internship Offer Letter</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Enrollment No</th>
                                    <th>University Name</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>edit</th>
                                    <th>view pdf</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length >= 0 ? (
                                    userData.map((udata) => (
                                        <tr key={udata.id}> 
                                            <td>{udata.id}</td>
                                            <td>{udata.name}</td>
                                            <td>{udata.enroll_no}</td>
                                            <td>{udata.university_name}</td>
                                            <td>{udata.location}</td>
                                            <td>{udata.date}</td>
                                            {/* <td>{udata.ref}</td> */}
                                         
                                            <td>
                                                <Link to={`/admin_up_st_off/${udata.id}`} className="btn btn-success mx-2">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                </td>
                                                <td>
                                                <a href={`http://localhost/ssp_pro_api/pdf_student_inten_offer.php/?id=${udata.id}`} className="btn btn-primary mx-2">
                                                    <FontAwesomeIcon icon={faFilePdf} /> 
                                                </a></td>
                                                <td>
                                                <button onClick={() => { handleDelete(udata.id) }} className="btn btn-danger mx-2">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No data available</td> 
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Admin_Home;

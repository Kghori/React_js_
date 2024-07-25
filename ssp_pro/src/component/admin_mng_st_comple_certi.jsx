import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './admin_home.css';
import Admin_Sidebar from './admin_sidebar';

function Admin_Mng_St_Comple_Certi() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
      const selectedValue = event.target.value;
      if (selectedValue) {
        navigate(selectedValue); // Navigate to the selected route
      }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get('http://localhost/ssp_pro_api/admin_completion_latter.php');
            console.log(response.data.result);
            setUserData(response.data.result); // Assuming result is an array of data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost/ssp_pro_api/admin_completion_latter.php?deid=${id}`);
            console.log(id);
            if (response.data) {
                console.log("Delete data successfully");
                setUserData(prevUserData => prevUserData.filter(user => user.id !== id));
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <>
            <div className="admin-panel">
                <Admin_Sidebar />
                <div className="main-content">
                    {/* <header>
                        <h1>Welcome, Admin!</h1>
                        <Link to="/admin-logout">Admin logout</Link>
                    </header> */}
                    <main>
                        <h2>Internship Completion Letter</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Project Name</th>
                                    <th>Sem No</th>
                                    <th>Degree</th>
                                    <th>Course</th>
                                    <th>Uni. Name</th>
                                    <th>Uni Location</th>
                                    <th>Student Name</th>
                                    <th>Guide Name</th>
                                    <th>Intern Start</th>
                                    <th>Intern End</th>

                                    <th>current date</th>  
                                    <th>dept name </th>                                  
                                    <th>view pdf</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? (
                                    userData.map((udata, index) => (
                                        <tr key={index}>
                                            <td>{udata.id}</td>
                                            <td>{udata.pro_name}</td>
                                            <td>{udata.sem_no}</td>
                                            <td>{udata.degree}</td>
                                            <td>{udata.course}</td>
                                            <td>{udata.uni_name}</td>
                                            <td>{udata.uni_location}</td>
                                            <td>{udata.student_name}</td>
                                            <td>{udata.guide_name}</td>
                                            <td>{udata.inter_st_date}</td>
                                            <td>{udata.inter_end_date}</td>
                                            <td>{udata.today_date}</td>
                                            <td>{udata.dept_name}</td>
                                            {/* <td>{udata.supervision_name}</td> */}
                                            <td>
                                                <a href={`http://localhost/ssp_pro_api/pdf__student_intern_completion.php/?id=${udata.id}`} name="view-pdf">
                                                    <FontAwesomeIcon icon={faFilePdf} /> 
                                                </a>
                                                </td>
                                                <td>
                                                <Link to={`/admin_up_st_comple/${udata.id}`} className="btn btn-success mx-2">
                                                    <FontAwesomeIcon icon={faEdit} /> 
                                                </Link>
                                                </td>
                                                <td>
                                                <button onClick={() => { handleDelete(udata.id) }} className="">
                                                    <FontAwesomeIcon icon={faTrash} /> 
                                                </button>
                                                </td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14">No data available</td>
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

export default Admin_Mng_St_Comple_Certi;

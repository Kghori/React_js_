import React, { useState } from 'react';
import axios from 'axios';
import './admin_home.css'; // Assuming you have defined your CSS styles
import Admin_Sidebar from './admin_sidebar';

function Admin_Add_Completion_form() {
  const [formData, setFormData] = useState({
    pro_name: '',
    sem_no: '',
    degree: '',
    course: '',
    uni_name: '',
    uni_location: '',
    student_name: '',
    guide_name: '',
    inter_st_date: '',
    inter_end_date: '',
    today_date: '',
    dept_name: '',
    supervision_name: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const [msg,setmsg]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost/ssp_pro_api/admin_completion_latter.php", formData);
      console.log(result.data['suc']); // Log the response data if needed
      setmsg(result.data['suc']);// Log the response from the backend
      setTimeout(() => {
        setmsg(""+msg); // Clear the success message after a delay
    }, 4000);
      // Optionally handle success response here (e.g., show success message)
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Optionally handle error (e.g., show error message to user)
    }
  };

  return (<>    <div className="admin-panel">
      {/* Include Admin_Sidebar component if defined */}
      <Admin_Sidebar />


      <div className="main-content">

      {/* <header>
                        <h1>Welcome, Admin!</h1>
                        <Link to="/admin-logout">Admin logout</Link>
                    </header> */}
        <h2>Edit Completion Data</h2>
        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input type="text" name="pro_name" value={formData.pro_name} onChange={handleInputChange} />

          <label>Semester Number</label>
          <input type="text" name="sem_no" value={formData.sem_no} onChange={handleInputChange} />

          <label>Degree</label>
          <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} />

          <label>Course</label>
          <input type="text" name="course" value={formData.course} onChange={handleInputChange} />

          <label>University Name</label>
          <input type="text" name="uni_name" value={formData.uni_name} onChange={handleInputChange} />

          <label>University Location</label>
          <input type="text" name="uni_location" value={formData.uni_location} onChange={handleInputChange} />

          <label>Student Name</label>
          <input type="text" name="student_name" value={formData.student_name} onChange={handleInputChange} />

          <label>Guide Name</label>
          <input type="text" name="guide_name" value={formData.guide_name} onChange={handleInputChange} />

          <label>Internship Start Date</label>
          <input type="date" name="inter_st_date" value={formData.inter_st_date} onChange={handleInputChange} />

          <label>Internship End Date</label>
          <input type="date" name="inter_end_date" value={formData.inter_end_date} onChange={handleInputChange} />

          <label>Today's Date</label>
          <input type="date" name="today_date" value={formData.today_date} onChange={handleInputChange} />

          <label>Department Name</label>
          <input type="text" name="dept_name" value={formData.dept_name} onChange={handleInputChange} />

          <label>Supervision Name</label>
          <input type="text" name="supervision_name" value={formData.supervision_name} onChange={handleInputChange} />

          <button type="submit">Submit</button><label htmlFor="" style={{color:'green'}}>{msg}</label>
        </form>
      </div>
    </div>
    </>
  );
}

export default Admin_Add_Completion_form;

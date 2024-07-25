import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './component/admin_home.css';
import Admin_Sidebar from './component/admin_sidebar';

function Admin_Up_Comple() {
  const { id } = useParams(); // Get the id parameter from the URL
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
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once when component mounts

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost/ssp_pro_api/admin_completion_latter.php?stid=${id}`);
      const data = await response.json();
      console.log(data.cate[0]);
      setFormData({
        ...formData,
        // upname: data.cate[0].pro_name, // Update name field in state
        id:id,
        pro_name:data.cate[0].pro_name,
        sem_no: data.cate[0].sem_no,
        degree: data.cate[0].degree,
        course: data.cate[0].degree,
        uni_name: data.cate[0].uni_name,
        uni_location: data.cate[0].uni_location,
        student_name: data.cate[0].student_name,
        guide_name: data.cate[0].guide_name,
        inter_st_date: data.cate[0].inter_st_date,
        inter_end_date: data.cate[0].inter_end_date,
        today_date: data.cate[0].today_date,
        dept_name: data.cate[0].dept_name,
        supervision_name: data.cate[0].guide_name
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const [msg,setmsg]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost/ssp_pro_api/admin_completion_latter.php?stid=${id}`, formData);
      console.log(result.data['success']); 
      setmsg(result.data['success']);
      setTimeout(() => {
        
        setmsg(""+msg); 
    }, 4000);

    } catch (error) {
      console.error('Error updating completion data:', error);
    }
  };
  

  return (
    <>
    <div className="admin-panel"> 
    <Admin_Sidebar />
      <div className="main">
        <main>
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

          <button type="submit">Update Completion Data</button>


          <label htmlFor="">{msg}</label>
        </form>
        </main>        </div>
      </div>
    </>
  );
}

export default Admin_Up_Comple;

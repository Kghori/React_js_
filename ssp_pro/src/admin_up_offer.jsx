import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import Admin_Sidebar from './component/admin_sidebar';
import './component/admin_home.css';
function Admin_Up_Offer() {
  const { id } = useParams();
  console.log(id);

  const [fvalue, setFvalue] = useState({
    upname: '',
    upenrollmentNumber: '',
    upuniversityName: '',
    upuniversityLocation: '',
    upsdate: ''
  });

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it runs once when component mounts

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost/ssp_pro_api/studentdata.php?stid=${id}`);
      const data = await response.json();
      console.log(data.cate[0].name);
      setFvalue({
        ...fvalue,
        upname: data.cate[0].name, // Update name field in state
        upenrollmentNumber: data.cate[0].enroll_no, // Update enrollment number field
        upuniversityName: data.cate[0].university_name, // Update university name field
        upuniversityLocation: data.cate[0].location, // Update university location field
        upsdate: data.cate[0].date // Update start date field
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInput = (e) => {
    setFvalue({ ...fvalue, [e.target.name]: e.target.value });
  };

  const [msg,setmsg]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fvalue);
    const fdata = {
      id: id,
      name: fvalue.upname,
      eno: fvalue.upenrollmentNumber,
      uni_name: fvalue.upuniversityName,
      uni_loc: fvalue.upuniversityLocation,
      st_date: fvalue.upsdate
    };
    try {
      const result = await axios.put("http://localhost/ssp_pro_api/studentdata.php", fdata);
      // console.log(result.data['success']);
      setmsg(result.data['success']);// Log the response from the backend
      setTimeout(() => {
        setmsg(""+msg); // Clear the success message after a delay
    }, 4000);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <>



<div className="admin-panel"> 
  <Admin_Sidebar/>
      <div className='main'>
        <div className="container1">
          <h1>Enrollment Form</h1>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="upid" />
            <label>Name</label>
            <input type="text" name="upname" value={fvalue.upname} onChange={handleInput} required />
            <label>Enrollment Number</label>
            <input type="text" name="upenrollmentNumber" value={fvalue.upenrollmentNumber} onChange={handleInput} required />
            <label>University Name</label>
            <input type="text" name="upuniversityName" value={fvalue.upuniversityName} onChange={handleInput} required />
            <label>University Location</label>
            <input type="text" name="upuniversityLocation" value={fvalue.upuniversityLocation} onChange={handleInput} />
            <label>Start Date</label>
            <input type="date" name="upsdate" value={fvalue.upsdate} onChange={handleInput} required />
            <button type="submit">Update</button><label htmlFor="" style={{color:'green'}}>{msg}</label>
          </form>
          
        </div>
      </div>
      </div>
    </>
  );
}

export default Admin_Up_Offer;

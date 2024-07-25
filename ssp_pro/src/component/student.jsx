import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Student = () => {
  const [fvalue, setfvalue] = useState({
    name: '',
    eno: '',
    degree: '',
    uni_name: '',
    uni_loc: '',
    st_Date:''
});

  const handleInput = (e) => {
    setfvalue({ ...fvalue, [e.target.name]: e.target.value });
  };
const [msg,setmsg]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fvalue);
    const fdata = {
      name: fvalue.name,
      eno: fvalue.enrollmentNumber,
      uni_name: fvalue.universityName,
      uni_loc: fvalue.universityLocation,
      st_date: fvalue.sdate
    };
    try {
      const result = await axios.post("http://localhost/ssp_pro_api/studentdata.php", fdata);
      console.log(result.data['suc']);
      setmsg(result.data['suc']);// Log the response from the backend
      setTimeout(() => {
        setmsg(""+msg); // Clear the success message after a delay
    }, 4000);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className='main'>
      <div className="container1">
        <h1>Enrollment Form</h1>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="upid" />
          <label>Name</label>
          <input type="text" name="name" onChange={handleInput} required />
          <label>Enrollment Number</label>
          <input type="text" name="enrollmentNumber" onChange={handleInput} required />
          <label>University Name</label>
          <input type="text" name="universityName" onChange={handleInput} required />
          <label>University Location</label>
          <input type="text" name="universityLocation" onChange={handleInput} />
          <label>Start Date</label>
          <input type="date" name="sdate" onChange={handleInput} required />
          <button type="submit">Submit</button><label htmlFor="" style={{color:'green'}}>{msg}</label>
        </form>
        <Link to="/admin-login">Admin Login</Link>
      </div>
    </div>
  );
};

export default Student;

import { useState,useEffect } from 'react';

// import './App.css';
// import axios from "axios";
function App() {
  const [fvalue, setfvalue] = useState({project_name:'',semester_no:'',degree:'',course:'',university_name:'',university_location:'',student_name:'',guidance_name:'',internship_start_date:'',internship_end_date:''});
    const [msg,setmsg]=useState('');
  const handleinput=(e)=>{

    setfvalue({ ...fvalue, [e.target.name]: e.target.value });
  }
const handlesubmit=async(e)=>{
  e.preventDefault();
  console.log(fvalue);
  const fdata={  
    pname:fvalue.project_name,
    sno:fvalue.semester_no,
    degree:fvalue.degree,
    
    course:fvalue.course, 
    uname:fvalue.university_name,
    uloc:fvalue.university_location,
    stname:fvalue.student_name,
    guiname:fvalue.guidance_name,
    stdate:fvalue.internship_start_date,
    eddate:fvalue.internship_end_date
  }
  
const result =await axios.post("http://localhost/resume_maker_api/api/certigen.php",fdata);
console.log(result);
if (result.data) {
  console.log(result.data.suc);
  // usenavigate('/login');
  setmsg(result.data);
  setTimeout(() => {
      setmsg(""+msg); // Clear the success message after a delay
  }, 4000);
} else {
  console.log("No success message received");
} 
}
const [userData, setUserData] = useState([]);

useEffect(() => {
  getUserData();
},[]);

const getUserData = async () => {
         const req = await fetch(`http://localhost/resume_maker_api/api/certigen.php`);
      const res = await req.json();
      console.log(res.result);
      setUserData(res.result);
      if (res && res.cate) {
          console.log(res);
          setUserData(res.cate); // Assuming the array of categories is stored in res.cate
      }
}


  return (
    <>
      <div className="row">
        <form className="form_com" onSubmit={handlesubmit}>

          <div class="row">
          <p className="text-sucess"> { msg }</p>   
            <div class="input-field col s12">
              <input id="project_name" name="project_name" onChange={handleinput} type="text" className="validate" />
              <label for="project_name">Project Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="semester_no" name="semester_no" type="text" onChange={handleinput} placeholder="please enter 1ST 2ed 3rd" class="validate" />
              <label for="semester_no">Semester Number</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="degree" name="degree" type="text" onChange={handleinput} class="validate" />
              <label for="degree">Degree</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="course" name="course" type="text" onChange={handleinput} class="validate" />
              <label for="course">Department Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="university_name" name="university_name" onChange={handleinput} type="text" class="validate" />
              <label for="university_name">University Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="university_location" onChange={handleinput} name="university_location" type="text" class="validate" />
              <label for="university_location">University Location</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="student_name" name="student_name" onChange={handleinput} type="text" class="validate" />
              <label for="student_name">Student Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="guidance_name" name="guidance_name" onChange={handleinput} type="text" class="validate" />
              <label for="guidance_name">Guidance Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="internship_start_date" onChange={handleinput} name="internship_start_date" type="date" class="validate" />
              <label for="internship_start_date">Internship Start Date</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="internship_end_date" onChange={handleinput} name="internship_end_date" type="date" class="validate" />
              <label for="internship_end_date">Internship End Date</label>
            </div>
          </div>
          <button class="btn waves-effect waves-light" type="submit" value="submit">submit
\


          </button>



          


            <h1>fetch</h1>


            <table>

           <thead>
            <th>id</th>
            <th>sem no</th>
         
            <th>degree</th>
         
            <th>course</th>
         
            <th>uniname</th>
         
            <th>unilocation</th>
         
            <th>name</th>
         
            <th>guide name</th>
            <th>start date</th>
            <th>end date</th>
         
            </thead> </table>
            {userData.length > 0 ? (
        userData.map((udata) => {
            const { no, stsno,stdegree,stcourse,stuname,stuloc,ststname,stguidencename,ststdate,steddate,stpname} = udata;
            return (
                <tr key={no}>
                    <td>{no}</td>
                    <td>{stsno}</td>
                    <td>{stdegree}</td>
                    <td>{stcourse}</td>
                    <td>{stuname}</td>
                    <td>{stuloc}</td>
                    <td>{ststname}</td>    
                    <td>{stguidencename}</td>
                    <td>{ststdate}</td>
                    <td>{stpname}</td>
                    <a href={`http://localhost/resume_maker_api/api/fetch.php?id=${no}`} name="view-pdf">
                    view pdf</a>
                 
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="3">No data available</td>
        </tr>
    )}
        </form>

      </div>




 <div>


 </div>

    </>
   );
 };

export default App;
// App.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



// const App = () => {
//     return (
//       <>       <h1>hello</h1>
//         </>
// );
// };

// export default App;



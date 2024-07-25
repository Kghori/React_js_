import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sports, setSports] = useState([]); 
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [error, setError] = useState({
    username: "",
    gender: "",
    dropdownValue: "",
    pass: "",
    cpass: ""
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'r1') {
      setGender(value);
    } else if (name === 'dropdown') {
      setDropdownValue(value);
    } else if (name === 'upassword') {
      setPass(value);
    } else if (name === 'confirm_pass') {
      setCpass(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const sport = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSports([...sports, sport]);
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempError = {};

    if (username === "" || gender === "" || dropdownValue === "" || pass === "" || cpass === "") {
      if (!username) {
        tempError.username = "Username is required";
      } else if (username.length !== 10) {
        tempError.username = "Username length must be 10";
      }

      if (!gender) {
        tempError.gender = "Gender is required";
      }

      if (!dropdownValue) {
        tempError.dropdownValue = "Dropdown value is required";
      }

      if (!pass) {
        tempError.pass = "Password is required";
      }

      if (!cpass) {
        tempError.cpass = "Confirm password is required";
      }
    } else {
      if (pass !== cpass) {
        tempError.cpass = "Passwords do not match";
      }else{
        console.log('Form submitted with:', { username, gender, dropdownValue, sports, pass, cpass });
        document.write(username);
      }

    } 

    setError(tempError);

    // if (Object.keys(tempError).length === 0) {
    //   console.log('Form submitted with:', { username, gender, dropdownValue, sports, pass, cpass });
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              {error.username && <span className="error">{error.username}</span>}
              <td><input type="text" name="username" value={username} onChange={handleInputChange} placeholder="Username" /></td>
            </tr>
            <tr>
              <td>
                {error.gender && <span className="error">{error.gender}</span>}
                <input type="radio" name="r1" value="male" onChange={handleInputChange} checked={gender === 'male'} /> Male
                <input type="radio" name="r1" value="female" onChange={handleInputChange} checked={gender === 'female'} /> Female
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" name="cricket" onChange={handleCheckboxChange} value="cricket" checked={sports.includes('cricket')} /> Cricket
                <input type="checkbox" name="kabbadi" onChange={handleCheckboxChange} value="kabbadi" checked={sports.includes('kabbadi')} /> Kabbadi
                <input type="checkbox" name="khokho" onChange={handleCheckboxChange} value="khokho" checked={sports.includes('khokho')} /> Khokho
                {error.sports && <span className="error">{error.sports}</span>}
              </td>
            </tr>
            <tr>
              <td>
                {error.dropdownValue && <span className="error">{error.dropdownValue}</span>}
                <select name="dropdown" value={dropdownValue} onChange={handleInputChange}>
                  <option value="">Select Option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </td>
            </tr>
            <tr>
              {error.pass && <span className="error">{error.pass}</span>}
              <td><input type='password' name="upassword" value={pass} onChange={handleInputChange} placeholder="Password" /></td>
            </tr>
            <tr>
              {error.cpass && <span className="error">{error.cpass}</span>}
              <td><input type='password' name="confirm_pass" value={cpass} onChange={handleInputChange} placeholder="Confirm Password" /></td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default App;

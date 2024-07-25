import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index1 from './component/index1';
import Admin_Login from './component/admin_login';
import Student from './component/student';
import Employee from './component/employee';
import Admin_Home from './component/admin_home';
import Admin_Mng_St_Comple_Certi from './component/admin_mng_st_comple_certi';
import Admin_Up_Offer  from './admin_up_offer';
import Admin_Up_Comple from './admin_up_comple';
import Admin_Add_Completion_form from './component/admin_add_completion_form';
import Admin_Logout from './component/admin_logout';
import Admin_Sidebar from './component/admin_sidebar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index1 />} />
        <Route path="/admin-sidebar" element={<Admin_Sidebar />} />
        <Route path="/admin-login" element={<Admin_Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin_home" element={<Admin_Home />} />
        <Route path="/admin__mng_st_comple" element={<Admin_Mng_St_Comple_Certi />} />
        <Route path="/admin_up_st_off/:id" element={<Admin_Up_Offer />} />
        <Route path="/admin_up_st_comple/:id" element={<Admin_Up_Comple />} />
        <Route path="/admin_add_Completion_form" element={<Admin_Add_Completion_form />} />
        <Route path="/admin_logout" element={<Admin_Logout />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;

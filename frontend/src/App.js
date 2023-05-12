import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CustomNavbar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { ForgotPassword } from "./components/forgotpassword";
import { ResetPassword } from "./components/resetpassword";

const Planetpass = () => {
  return (
    <Router>
      <CustomNavbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </div>
    </Router>
  );
};

export default Planetpass;

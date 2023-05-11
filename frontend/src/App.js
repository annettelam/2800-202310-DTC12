import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CustomNavbar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";


const Planetpass = () => {
  return (
    <Router>
      <CustomNavbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Planetpass;

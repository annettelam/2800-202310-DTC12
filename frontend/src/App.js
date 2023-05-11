import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CustomNavbar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Flights } from "./components/flights/flights";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { Dashboard } from "./components/dashboard/dashboard";


const Planetpass = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <CustomNavbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Planetpass;

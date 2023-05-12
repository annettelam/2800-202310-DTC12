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

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
    console.log("Logged in");
  };

  return (
    <Router>
      <CustomNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Planetpass;

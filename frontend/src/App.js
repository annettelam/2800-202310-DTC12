import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CustomNavbar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Flights } from "./components/flights/flights";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { ForgotPassword } from "./components/forgotpassword";
import { ResetPassword } from "./components/resetpassword";
import { Dashboard } from "./components/dashboard/dashboard";
import { Profile } from "./components/profile/profile";


const Planetpass = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));

  const handleLogin = (user) => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
    localStorage.setItem('user', user);
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Planetpass;

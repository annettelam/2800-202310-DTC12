import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CustomNavbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Home } from "./components/home/home";
import { Flights } from "./components/flights/flights";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { ForgotPassword } from "./components/forgotpassword";
import { ResetPassword } from "./components/resetpassword";
import { Dashboard } from "./components/dashboard/dashboard";
import { NotFoundPage } from "./components/404/404";
import { Profile } from "./components/profile/profile";
import { Suggestions } from "./components/suggestions/suggestions";
import { Hotels } from "./components/hotels/hotels.jsx";
import { Recommendations } from "./components/recommendations/recommendations";
import { PrivacyPolicy } from "./components/privacy-policy";




const Planetpass = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  const handleLogin = (user) => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
    localStorage.setItem('user', user);
    console.log("Logged in");
  };

  return (
    <Router>
      <CustomNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<Dashboard isNavbarOpen={isNavbarOpen} />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes >
      </div >
      <Footer />
    </Router >
  );
};

export default Planetpass;

import React, { useState } from 'react';
import './App.css';
import { SignUp } from "./components/signup";
import { Login } from "./components/login";


const Planetpass = () => {
  const [currentForm, setCurrentForm] = useState("signup");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
        { currentForm === "signup" ? (<SignUp onFormSwitch={toggleForm} />) : (<Login onFormSwitch={toggleForm} />) }
    </div>
  );
};

export default Planetpass;

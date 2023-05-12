import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';

export const Flights = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
            <h1> Welcome {user.firstName} {user.lastName} </h1>
            <div className="text-center my-5"> This is the flights page </div>
        </div >
    );
};
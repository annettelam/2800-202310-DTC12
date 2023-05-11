import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { Footer } from '../footer/footer';

export const Flights = ({loggedIn}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
            <div className="text-center my-5"> This is the flights page </div>
            <Footer />
        </div >
    );
};
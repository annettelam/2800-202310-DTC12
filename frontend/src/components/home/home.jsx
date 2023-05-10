import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { Footer } from '../footer/footer';

export const Home = () => {
    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
            <NavigationBar />
            <div className="text-center my-5">Hello
            </div>
            <Footer />
        </div >
    );
};
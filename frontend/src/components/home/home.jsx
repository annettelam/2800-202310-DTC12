import React, { useState } from 'react';
import NavigationBar from '../navbar/navbar';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';

export const Home = (props) => {
    return (
        <div>
            <NavigationBar />
            <div className="text-center my-5">Hello
            </div>
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center p-3">
                    © 2023 PlanetPass. All Rights Reserved.
                </div>
            </footer>
        </div >
    );
};
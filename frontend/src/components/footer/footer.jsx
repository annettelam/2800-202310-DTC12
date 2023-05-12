import React from 'react';
import { Container } from 'react-bootstrap';
import '../../App.css';

export const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container>
                <div className="text-center p-3">
                    © 2023 PlanetPass. All Rights Reserved.
                </div>
            </Container>
        </footer>
    );
};

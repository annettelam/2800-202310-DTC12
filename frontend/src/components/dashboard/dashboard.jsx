import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Popover, OverlayTrigger } from 'react-bootstrap';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import bkg from '../../bkg.jpg';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [savedFlights, setSavedFlights] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
        setUser(JSON.parse(localStorage.getItem('user')));

        // Get saved flights from localStorage
        const savedFlights = JSON.parse(localStorage.getItem('user')).savedFlights;
        setSavedFlights(savedFlights);
    }, [navigate]);

    // Check if flight is saved
    const isFlightSaved = (flightId) => {
        return savedFlights.find((flight) => flight.id === flightId) !== undefined;
    };

    // Save flight
    const handleSaveFlight = async (flightId) => {
        // Update useState
        const newSavedFlights = savedFlights.filter((savedflight) => savedflight.id !== flightId);
        setSavedFlights(newSavedFlights);

        // Find flight object
        const flight = savedFlights.find((flight) => flight.id === flightId);

        // Update database
        try {
            const response = await axios.post('http://localhost:4000/save-flight', {
                flight,
                user,
            });
            console.log(response.data);

            // Update localStorage
            if (response.data === 'Flight saved') {
                user.savedFlights.push(flight);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                user.savedFlights = user.savedFlights.filter((savedFlight) => savedFlight.id !== flightId);
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="dashboard-container"
            style={{
                backgroundImage: `url(${bkg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top 50px', // Move background down 50 pixels
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                fontFamily: 'Questrial',
                minHeight: '95vh',
                overflowX: 'auto', // Enable horizontal scrolling
                padding: '2rem 0', // Add top and bottom padding
            }}
        >
            <Container fluid className="px-3">
                <Row className="flex-nowrap">
                    <Col>
                        <h2 className="mb-4">Flights</h2>
                        <div className="horizontal-scroll">
                            {savedFlights.map((flight) => (
                                <Card key={flight.id} className="m-2" style={{ minWidth: '300px', maxWidth: '400px' }}>
                                    <Card.Header>
                                        <FaHeart
                                            size={30}
                                            color={isFlightSaved(flight.id) ? 'red' : 'black'}
                                            fill={isFlightSaved(flight.id) ? 'red' : 'none'}
                                            stroke={isFlightSaved(flight.id) ? 'none' : 'currentColor'}
                                            strokeWidth="10"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSaveFlight(flight.id)}
                                        />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className="text-center">${flight.price.amount}</Card.Title>
                                        <Card.Text className="text-center">
                                            <b>Origin:</b> {flight.legs[0].origin.name}
                                        </Card.Text>
                                        <Card.Text className="text-center">
                                            <b>Origin Code:</b> {flight.legs[0].origin.display_code}
                                        </Card.Text>
                                        {/* ... Rest of the flight details */}
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="flex-nowrap">
                    <Col>
                        <h2 className="mb-4">Hotels</h2>
                        <div className="horizontal-scroll">{/* ... Hotel cards */}</div>
                    </Col>
                </Row>
                {/* Add other categories here */}
            </Container>
        </div>
    );
};

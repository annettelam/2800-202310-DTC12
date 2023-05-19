import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, Flex, Button as ChakraButton, Stack, Grid } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';


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
        //console.log("Flight id for saved:", flightId);
        return savedFlights.find((flight) => flight.id === flightId) != undefined;
    };
    // Save flight
    const handleSaveFlight = async (flightId) => {
        console.log(flightId);
        console.log(isFlightSaved(flightId));
        if (!isFlightSaved(flightId)) {
            // Update useState
            setSavedFlights([...savedFlights, flightId]);
        } else {
            // Update useState
            const newSavedFlights = savedFlights.filter((savedflightId) => savedflightId !== flightId);
            setSavedFlights(newSavedFlights);
        }

        // Find flight object
        const flight = savedFlights.find((flight) => flight.id === flightId);
        // Update database
        console.log(flight);
        try {
            const response = await axios.post('http://localhost:4000/save-flight', {
                flight, user
            });
            console.log(response.data);

            // Update localStorage
            if (response.data === "Flight saved") {
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
        <div>
           

            <Container maxWidth="6xl">
            <Heading as="h2" size="xl" mb="4">
                    Saved Flights
                </Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {savedFlights.map((flight) => (
                    <Box key={flight.id} p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Box align="right" onClick={() => handleSaveFlight(flight.id)}>
                            <FaHeart
                                size={30}
                                color={isFlightSaved(flight.id) ? 'red' : 'black'}
                                fill={isFlightSaved(flight.id) ? 'red' : 'none'}
                                stroke={isFlightSaved(flight.id) ? 'none' : 'currentColor'}
                                strokeWidth="10"
                                style={{ cursor: 'pointer' }}
                            />
                        </Box>
                        <Heading align="center">${flight.price.amount}</Heading>
                        <Text align="center" mt="2">
                            <b>Origin:</b> {flight.legs[0].origin.name}
                        </Text>
                        <Text align="center" mt="2">
                            <b>OriginCode:</b> {flight.legs[0].origin.display_code}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Destination:</b> {flight.legs[0].destination.name}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Destination:</b> {flight.legs[0].destination.display_code}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Departure Time:</b> {flight.legs[0].departure}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Arrival Time:</b> {flight.legs[0].arrival}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Carrier:</b> {flight.legs[0].carriers[0].name}
                        </Text>
                        <Text align="center" mt="2">
                            <b>Stops:</b> {flight.legs[0].stop_count}
                        </Text>
                        {flight.legs[0].stop_count > 0 ? (
                            <div>
                                {flight.legs[0].stops.map((stop, index) => (
                                    <Text align="center" mt="2" key={index}>
                                        <b>Stop:</b> {stop.name}
                                        <b>Stop:</b> {stop.display_code}
                                    </Text>
                                ))}
                            </div>
                        ) : (
                            <Text align="center" mt="2">
                                <b>Stop:</b> No stops
                            </Text>
                        )}


                        {flight.legs.length > 1 && (
                            <div>
                                <Text align="center" mt="2">
                                    <b>ReturnOrigin:</b> {flight.legs[1].origin.name}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return OriginCode:</b> {flight.legs[1].origin.display_code}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Destination:</b> {flight.legs[1].destination.name}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Destination:</b> {flight.legs[1].destination.display_code}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Departure Time:</b> {flight.legs[1].departure}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Arrival Time:</b> {flight.legs[1].arrival}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Carrier:</b> {flight.legs[1].carriers[0].name}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Return Stops:</b> {flight.legs[1].stop_count}
                                </Text>
                                {flight.legs[1].stop_count > 0 ? (
                                    <div>
                                        {flight.legs[1].stops.map((stop, index) => (
                                            <Text align="center" mt="2" key={index}>
                                                <b>Return Stop:</b> {stop.name}
                                                <b>Return Stop:</b> {stop.display_code}
                                            </Text>
                                        ))}
                                    </div>
                                ) : (
                                    <Text align="center" mt="2">
                                        <b>Stop:</b> No stops
                                    </Text>
                                )}

                            </div>
                        )}


                        {flight.is_eco_contender && (
                            <>
                                <Text align="center" mt="2">
                                    <span style={{ color: 'green' }}>
                                        <b>Eco flight:</b> {flight.is_eco_contender ? 'Yes' : 'No'}
                                    </span>

                                </Text>
                                <Text align="center" mt="2">
                                    <span style={{ color: 'green' }}>
                                        This flight emits
                                        <b> {Math.round(Math.abs(flight.eco_contender_delta))}% </b>
                                        less CO2 than other flights flying the same route</span>

                                </Text>
                            </>
                        )}

                        {/* SVG element for flight route */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            {/* Line connecting origin and destination */}
                            <line
                                x1="10%"
                                y1="50%"
                                x2="90%"
                                y2="50%"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                            />

                            {/* Dots for stops */}
                            {flight.legs[0].stop_count > 0 && (
                                flight.legs[0].stops.map((stop, index) => (
                                    <g key={index}>
                                        {/* Dot for stop */}
                                        <circle
                                            cx={`${((index + 1) / (flight.legs[0].stop_count + 1)) * 80 + 10}%`}
                                            cy="50%"
                                            r="4"
                                            fill="black"
                                        />

                                        {/* Display code for the stop */}
                                        <text
                                            x={`${((index + 1) / (flight.legs[0].stop_count + 1)) * 80 + 10}%`}
                                            y="60%"
                                            textAnchor="middle"
                                            fontSize="10"
                                        >
                                            {stop.display_code}
                                        </text>
                                    </g>
                                ))
                            )}

                            {/* Display code for origin */}
                            <text x="5%" y="50%" textAnchor="start" alignmentBaseline="middle" fontSize="12" >
                                {flight.legs[0].origin.display_code}
                            </text>

                            {/* Display code for destination */}
                            <text x="95%" y="50%" textAnchor="end" alignmentBaseline="middle" fontSize="12">
                                {flight.legs[0].destination.display_code}
                            </text>
                        </svg>

                    </Box>
                ))}
                </Grid>
                
                
            </Container>
        </div>



    );

};

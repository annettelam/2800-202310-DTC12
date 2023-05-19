import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    Button as ChakraButton,
    Stack,
    Grid,
    ChakraProvider,
} from '@chakra-ui/react';
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
        <ChakraProvider>
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
                }}
            >
                <Container maxWidth="6xl" mt="2" p="3">
                    <Heading align="center" fontFamily="Questrial">
                        Hello, {user.firstName} {user.lastName}.
                    </Heading>
                    <Text align="center" mt="2">
                        Here are your saved flights and accommodations.
                    </Text>
                    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="4">
                        {savedFlights.map((flight) => (
                            <Box
                                key={flight.id}
                                p="4"
                                boxShadow="lg"
                                rounded="md"
                                bg="aliceblue"
                                mb="4"
                                maxW="sm"
                                mx="auto"
                            >
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
                                    <b>Origin Code:</b> {flight.legs[0].origin.display_code}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Destination:</b> {flight.legs[0].destination.name}
                                </Text>
                                <Text align="center" mt="2">
                                    <b>Destination Code:</b> {flight.legs[0].destination.display_code}
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
                                                <br />
                                                <b>Stop Code:</b> {stop.display_code}
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
                                            <b>Return DestinationCode:</b> {flight.legs[1].destination.display_code}
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
                                                        <br />
                                                        <b>Return Stop Code:</b> {stop.display_code}
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
                                                less CO2 than other flights flying the same route
                                            </span>
                                        </Text>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Grid>
                </Container>
            </div >
        </ChakraProvider >
    );
};

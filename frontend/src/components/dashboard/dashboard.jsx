import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Container, Heading, Text, Grid, ChakraProvider,} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import bkg3 from '../../bkg.jpg';
import landingPlane from '../flights/landing-airplane.png';
import takeoffPlane from '../flights/takeoff-airplane.png';
import { formatTime, formatDuration, formatStopDisplay } from '../flights/flights.jsx';

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
          backgroundImage: `url(${bkg3})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top 50px', // Move background down 50 pixels
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          fontFamily: 'Questrial',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="6xl">
          {/* Header for Saved Flights */}
          <div className="header-section">
            <Heading as="h1" size="xl" mb="4" textAlign="center">
              Saved Flights
            </Heading>
          </div>

          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {/* Display Flight Results */}
            {savedFlights.map((flight) => (
              <Box key={flight.id} p="4" boxShadow="lg" rounded="md" bg="white" mb="4" position="relative">
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
                <Heading>${flight.price.amount.toFixed(2)}</Heading>

                {/* Eco flight information */}
                {flight.is_eco_contender && (
                  <Box>
                    <Text align="left" fontWeight="bold" fontSize="lg" mb="0">
                      <span style={{ color: 'green' }}>Eco Flight</span>
                    </Text>
                    <Text align="left">
                      <span style={{ color: 'green' }}>
                        Produces <b>{Math.round(Math.abs(flight.eco_contender_delta))}%</b> less carbon emissions compared to similar flights.
                      </span>
                    </Text>
                  </Box>
                )}

                {/* Iterate over legs and display departure times */}
                {flight.legs.map((leg, index) => (
                  <Box key={index}>
                    <hr />
                    <h4>{index === 0 ? 'Departure Flight' : 'Return Flight'}</h4>
                    <h6>
                      {leg.origin.name} - {leg.destination.name}
                    </h6>
                    <Text mt="1" mb="1">
                      <b>{`${formatTime(leg.departure)} - ${formatTime(leg.arrival)}`}</b>
                    </Text>
                    <Text mt="1" mb="1">{formatDuration(leg.duration)}</Text>
                    <Text mt="1" mb="1">{leg.carriers[0].name}</Text>

                    {/* SVG element for flight route */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100px" className="m-auto" style={{ maxWidth: '300px' }}>
                      {/* Line connecting origin and destination */}
                      <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none" />

                      {/* Dots for stops */}
                      {leg.stop_count > 0 &&
                        leg.stops.map((stop, index) => (
                          <g key={index}>
                            {/* Dot for stop */}
                            <circle cx={`${((index + 1) / (leg.stop_count + 1)) * 80 + 10}%`} cy="50%" r="4" fill="red" />

                            {/* Display code for the stop */}
                            <text x={`${((index + 1) / (leg.stop_count + 1)) * 80 + 10}%`} y="65%" textAnchor="middle" fontSize="10" fontWeight="bold">
                              {stop.display_code}
                            </text>
                          </g>
                        ))}

                      {/* Landing airplane */}
                      <image href={takeoffPlane} x="5%" y="50%" width="20" height="20" transform="translate(-10, -10)" />

                      {/* Display code for origin */}
                      <text x="10%" y="50%" textAnchor="start" alignmentBaseline="middle" fontSize="12">
                        {leg.origin.display_code}
                      </text>

                      {/* Takeoff airplane */}
                      <image href={landingPlane} x="88%" y="50%" width="20" height="20" transform="translate(10, -10)" />

                      {/* Display code for destination */}
                      <text x="90%" y="50%" textAnchor="end" alignmentBaseline="middle" fontSize="12">
                        {leg.destination.display_code}
                      </text>

                      {/* Number of stops */}
                      <text x="50%" y="80%" textAnchor="middle" fontSize="12" fill={leg.stop_count > 0 ? 'red' : 'green'} fontWeight="bold">
                        {formatStopDisplay(leg.stop_count)}
                      </text>
                    </svg>
                  </Box>
                ))}
              </Box>
            ))}
          </Grid>

        </Container>

        <Container maxWidth="6xl">
          {/* Header for Saved Hotels */}
          <div className="header-section">
            <Heading as="h2" size="xl" mb="2" textAlign="center">
              Saved Hotels
            </Heading>
          </div>
        </Container>
        );
      </div>
    </ChakraProvider>
  );
};







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Checkbox, Heading, Text, Flex, FormControl, FormLabel, Select, Input, Button as ChakraButton } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import './flights.css';
import bkg3 from '../../bkg3.jpg';
import landingPlane from './landing-airplane.png';
import takeoffPlane from './takeoff-airplane.png';
import { FaHeart } from 'react-icons/fa';



// Format time
export function formatTime(timeString) {
    const date = new Date(timeString);
    const formattedTime = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return formattedTime;
}

// Format duration
export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

// Format stop display
export function formatStopDisplay(stops) {
    if (stops === 0) {
        return 'Direct';
    } else {
        return `${stops} Stop${stops > 1 ? 's' : ''}`;
    }
}

export const Flights = () => {
    const navigate = useNavigate();

    // User
    const [user, setUser] = useState({});

    // Search form
    const [originDisplayCode, setOrigin] = useState('');
    const [destinationDisplayCode, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('oneWay');
    const [adults, setAdults] = useState(1);
    const [cabinClass, setCabinClass] = useState('economy');
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Flights
    const [flights, setFlights] = useState({});
    const [savedFlights, setSavedFlights] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [showEcoFlights, setShowEcoFlights] = useState(false);


    // Easter Egg Animation
    const [isLeafAnimationEnabled, setLeafAnimationEnabled] = useState(false);

    // Pagination
    const batchCount = 4;
    const [displayResultsCount, setDisplayResultsCount] = useState(batchCount);

    useEffect(() => {
        // Check is user is logged in
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
        // Save user from localStorage
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        setUser(JSON.parse(localStorage.getItem('user')));

        // Get saved flights from localStorage
        if (userFromLocalStorage && userFromLocalStorage.savedFlights) {
            // Get saved flights from localStorage
            const savedFlights = JSON.parse(localStorage.getItem('user')).savedFlights;
            const savedFlightIds = savedFlights.map((savedFlight) => savedFlights.id);
            setSavedFlights(savedFlightIds);
        }
    }, [navigate]);

    // Check if flight is saved
    const isFlightSaved = (flightId) => {
        //console.log("Flight id for saved:", flightId);
        return savedFlights.includes(flightId);
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
        const flight = flights.find((flight) => flight.id === flightId);
        // Update database
        console.log(flight);
        try {
            const response = await axios.post('https://planetpass-backend.onrender.com/save-flight', {
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

    // Change destination
    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        // Check if Easter Egg is triggered
        if (e.target.value === 'Earth') {
            setLeafAnimationEnabled(true);
            console.log(isLeafAnimationEnabled)
        } else {
            setLeafAnimationEnabled(false);
        }
    };

    // Get flights on form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType, adults, cabinClass);
        try {
            await axios.post('https://planetpass-backend.onrender.com/flights', {
                originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType, adults, cabinClass
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFlights(res.data);
                    setHasNextPage(displayResultsCount < res.data.length);
                    setFormSubmitted(true);

                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Load more flights
    const loadMoreFlights = () => {
        setDisplayResultsCount(displayResultsCount + batchCount);
        setHasNextPage(displayResultsCount < flights.length);
    }


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

                <Container maxWidth="xl">
                    <Box p="4" boxshadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center">Flights</Heading>
                        <Text align="center" mt="2">
                            Search for Flights here.
                        </Text>
                        <Form className="text-center" onSubmit={handleSubmit}>

                            <FormControl>
                                <FormLabel>Origin</FormLabel>
                                <Select
                                    name="originDisplayCode"
                                    value={originDisplayCode}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                >
                                    <option value="" style={{ color: 'grey' }}>Select origin</option>
                                    <option value="ATL">Atlanta - Hartsfield-Jackson Atlanta International Airport (ATL)</option>
                                    <option value="BOS">Boston - Logan International Airport (BOS)</option>
                                    <option value="ORD">Chicago - O'Hare International Airport (ORD)</option>
                                    <option value="DFW">Dallas - Dallas/Fort Worth International Airport (DFW)</option>
                                    <option value="HNL">Honolulu - Daniel K. Inouye International Airport (HNL)</option>
                                    <option value="IAH">Houston - George Bush Intercontinental Airport (IAH)</option>
                                    <option value="JFK">New York - John F. Kennedy International Airport (JFK)</option>
                                    <option value="LAX">Los Angeles - Los Angeles International Airport (LAX)</option>
                                    <option value="MEX">Mexico City - Mexico City International Airport (MEX)</option>
                                    <option value="MIA">Miami - Miami International Airport (MIA)</option>
                                    <option value="YQB">Quebec City - Quebec City Jean Lesage International Airport (YQB)</option>
                                    <option value="SEA">Seattle - Seattle-Tacoma International Airport (SEA)</option>
                                    <option value="YYZ">Toronto - Toronto Pearson International Airport (YYZ)</option>
                                    <option value="YVR">Vancouver - Vancouver International Airport (YVR)</option>
                                </Select>
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Destination</FormLabel>
                                <Select
                                    name="destinationDisplayCode"
                                    value={destinationDisplayCode}
                                    onChange={handleDestinationChange}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                >
                                    <option value="" style={{ color: 'grey' }}>Select destination</option>
                                    <option value="ATL">Atlanta - Hartsfield-Jackson Atlanta International Airport (ATL)</option>
                                    <option value="BOS">Boston - Logan International Airport (BOS)</option>
                                    <option value="ORD">Chicago - O'Hare International Airport (ORD)</option>
                                    <option value="DFW">Dallas - Dallas/Fort Worth International Airport (DFW)</option>
                                    <option value="HNL">Honolulu - Daniel K. Inouye International Airport (HNL)</option>
                                    <option value="IAH">Houston - George Bush Intercontinental Airport (IAH)</option>
                                    <option value="JFK">New York - John F. Kennedy International Airport (JFK)</option>
                                    <option value="LAX">Los Angeles - Los Angeles International Airport (LAX)</option>
                                    <option value="MEX">Mexico City - Mexico City International Airport (MEX)</option>
                                    <option value="MIA">Miami - Miami International Airport (MIA)</option>
                                    <option value="YQB">Quebec City - Quebec City Jean Lesage International Airport (YQB)</option>
                                    <option value="SEA">Seattle - Seattle-Tacoma International Airport (SEA)</option>
                                    <option value="YYZ">Toronto - Toronto Pearson International Airport (YYZ)</option>
                                    <option value="YVR">Vancouver - Vancouver International Airport (YVR)</option>
                                    <option value="Earth"> Earth</option>
                                </Select>
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Departure Date</FormLabel>
                                <Input
                                    type="date"
                                    name="departureDate"
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                />
                            </FormControl>

                            <div>
                                <Form.Check
                                    type="radio"
                                    id="oneWay"
                                    name="tripType"
                                    value="oneWay"
                                    label="One Way"
                                    checked={tripType === 'oneWay'}
                                    onChange={() => setTripType('oneWay')}
                                />

                                <Form.Check
                                    type="radio"
                                    id="roundTrip"
                                    name="tripType"
                                    value="roundTrip"
                                    label="Round Trip"
                                    checked={tripType === 'roundTrip'}
                                    onChange={() => setTripType('roundTrip')}
                                />
                            </div>

                            {tripType === 'roundTrip' && (
                                <Form.Group controlId="formReturnDate">
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="returnDate"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                    />
                                </Form.Group>
                            )}

                            <div className="d-flex">
                                <Form.Group controlId="formAdults" style={{ width: '48%' }}>
                                    <Form.Label>Number of Adults</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="adults"
                                        min="1"
                                        max="10"
                                        value={adults}
                                        onChange={(e) => setAdults(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formCabinClass" style={{ width: '48%' }}>
                                    <Form.Label>Cabin Class</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="cabinClass"
                                        value={cabinClass}
                                        onChange={(e) => setCabinClass(e.target.value)}
                                    >
                                        <option value="economy">Economy</option>
                                        <option value="premium_economy">Premium Economy</option>
                                        <option value="business">Business</option>
                                        <option value="first">First</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form>
                    </Box>
                </Container>

                {isLeafAnimationEnabled && (
                    <div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                        <div className="paper-airplane falling"></div>
                    </div>
                )}

                {/* Filter option */}
                {formSubmitted && (
                    <Flex justify="center" mt="4" mb="2">
                        <Checkbox
                            isChecked={showEcoFlights}
                            onChange={() => setShowEcoFlights(!showEcoFlights)}
                            style={{ borderColor: 'aliceblue', color: 'black' }}
                        >
                            Show Eco Flights Only
                        </Checkbox>
                    </Flex>
                )}

                {/* Display Flight Results */}
                <Container maxWidth="6xl">
                    {Object.keys(flights)
                        .filter((key) => !showEcoFlights || flights[key].is_eco_contender)
                        .slice(0, displayResultsCount)
                        .map((key) => (
                            <Box key={key} p="4" boxShadow="lg" rounded="md" bg="white" mb="4" position="relative">
                                <Box align="right" onClick={() => handleSaveFlight(flights[key].id)}>
                                    <FaHeart
                                        size={30}
                                        color={isFlightSaved(flights[key].id) ? 'red' : 'black'}
                                        fill={isFlightSaved(flights[key].id) ? 'red' : 'none'}
                                        stroke={isFlightSaved(flights[key].id) ? 'none' : 'currentColor'}
                                        strokeWidth="10"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Box>
                                <Heading>${flights[key].price.amount.toFixed(2)}</Heading>

                                {/* Eco flight information */}
                                {flights[key].is_eco_contender && (
                                    <Box>
                                        <Text align="left" fontWeight="bold" fontSize="lg" mb="0">
                                            <span style={{ color: 'green' }}>Eco Flight</span>
                                        </Text>
                                        <Text align="left">
                                            <span style={{ color: 'green' }}>
                                                Produces <b>{Math.round(Math.abs(flights[key].eco_contender_delta))}%</b> less carbon emissions compared to similar flights.
                                            </span>
                                        </Text>
                                    </Box>
                                )}

                                {/* Iterate over legs and display departure times */}
                                {flights[key].legs.map((leg, index) => (
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
                </Container>

                {hasNextPage && (
                    <Flex justify="center" mt="4">
                        <ChakraButton onClick={loadMoreFlights} colorScheme="blue">
                            Load More
                        </ChakraButton>
                    </Flex>
                )}
            </div>

        </ChakraProvider>
    );
};
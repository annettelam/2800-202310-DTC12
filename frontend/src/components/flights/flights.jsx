import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, Flex, Button as ChakraButton } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import './flights.css';
import { FaHeart } from 'react-icons/fa';



export const Flights = () => {
    const batchCount = 4;

    const navigate = useNavigate();
    //const user = JSON.parse(localStorage.getItem('user'));
    // User
    const [user, setUser] = useState({});
    const [originDisplayCode, setOrigin] = useState('');
    const [destinationDisplayCode, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('oneWay');
    const [adults, setAdults] = useState(1);
    const [cabinClass, setCabinClass] = useState('economy');
    const [flights, setFlights] = useState({});
    const [isLeafAnimationEnabled, setLeafAnimationEnabled] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [savedFlights, setSavedFlights] = useState([]);

    const [displayResultsCount, setDisplayResultsCount] = useState(batchCount);


    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
        // Save user from localStorage
        setUser(JSON.parse(localStorage.getItem('user')));

        // Get saved flights from localStorage
        const savedFlights = JSON.parse(localStorage.getItem('user')).savedFlights;
        const savedFlightIds = savedFlights.map((savedFlight) => savedFlights.id);
        setSavedFlights(savedFlightIds);

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


    console.log("isLeafAnimationEnabled:", isLeafAnimationEnabled);



    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        if (e.target.value === 'Earth') {
            setLeafAnimationEnabled(true);
            console.log(isLeafAnimationEnabled)
        } else {
            setLeafAnimationEnabled(false);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        console.log(originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType, adults, cabinClass);

        try {
            await axios.post('http://localhost:4000/flights', {
                originDisplayCode, destinationDisplayCode, departureDate, returnDate, tripType, adults, cabinClass
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFlights(res.data);
                    setHasNextPage(displayResultsCount < res.data.length);

                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const loadMoreFlights = () => {
        setDisplayResultsCount(displayResultsCount + batchCount);
        setHasNextPage(displayResultsCount < flights.length);
    }


    return (

        <ChakraProvider>
            <div
                className="dashboard-container"
                style={{
                    backgroundImage: `url(${dashBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top 50px', // Move background down 50 pixels
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    fontFamily: 'Questrial',
                    minHeight: '100vh',
                }}
            >

                <Card bg="aliceblue" p="4" boxshadow="lg" rounded="md">

                    <div className="text-center my-5">
                        <Form className="text-center my-5" onSubmit={handleSubmit}>

                            <Form.Group controlId="formOrigin" style={{ width: '100%' }}>
                                <Form.Label>Origin</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="originDisplayCode"
                                    placeholder="Choose origin"
                                    value={originDisplayCode}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                >
                                    <option value="">Select origin</option>
                                    <option value="ATL">Atlanta - Hartsfield-Jackson Atlanta International Airport (ATL)</option>
                                    <option value="BOS">Boston - Logan International Airport (BOS)</option>
                                    <option value="ORD">Chicago - O'Hare International Airport (ORD)</option>
                                    <option value="DFW">Dallas - Dallas/Fort Worth International Airport (DFW)</option>
                                    <option value="HNL">Hawaii - Daniel K. Inouye International Airport (HNL)</option>
                                    <option value="IAH">Houston - George Bush Intercontinental Airport (IAH)</option>
                                    <option value="JFK">New York - John F. Kennedy International Airport (JFK)</option>
                                    <option value="LAX">Los Angeles - Los Angeles International Airport (LAX)</option>
                                    <option value="MEX">Mexico City - Mexico City International Airport (MEX)</option>
                                    <option value="MIA">Miami - Miami International Airport (MIA)</option>
                                    <option value="YQB">Quebec City - Quebec City Jean Lesage International Airport (YQB)</option>
                                    <option value="SEA">Seattle - Seattle-Tacoma International Airport (SEA)</option>
                                    <option value="YYZ">Toronto - Toronto Pearson International Airport (YYZ)</option>
                                    <option value="YVR">Vancouver - Vancouver International Airport (YVR)</option>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formDestination" style={{ width: '100%' }}>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="destinationDisplayCode"
                                    placeholder="Choose destination"
                                    value={destinationDisplayCode}
                                    onChange={handleDestinationChange} required
                                >
                                    <option value="">Select Destination</option>
                                    <option value="ATL">Atlanta - Hartsfield-Jackson Atlanta International Airport (ATL)</option>
                                    <option value="BOS">Boston - Logan International Airport (BOS)</option>
                                    <option value="ORD">Chicago - O'Hare International Airport (ORD)</option>
                                    <option value="DFW">Dallas - Dallas/Fort Worth International Airport (DFW)</option>
                                    <option value="HNL">Hawaii - Daniel K. Inouye International Airport (HNL)</option>
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

                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId="formDepartureDate" style={{ width: '100%' }}>
                                <Form.Label>Departure Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="departureDate"
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    required
                                />
                            </Form.Group>

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

                    </div>

                </Card>
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




                <Container maxWidth="6xl">
                    {Object.keys(flights).slice(0, displayResultsCount).map((key) => (
                        <Box key={key} p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                            <Box align="right" onClick={() => handleSaveFlight(flights[key].id)}>
                                <FaHeart
                                    size={30}
                                    color={isFlightSaved(flights[key].id) ? 'red' : 'black'}
                                    fill={isFlightSaved(flights[key].id) ? 'red' : 'none'}
                                    stroke={isFlightSaved(flights[key].id) ? 'none' : 'currentColor'}
                                    strokeWidth="10"
                                    style={{ cursor: 'pointer' }} />
                            </Box>
                            <Heading align="center">${flights[key].price.amount}</Heading>
                            <Text align="center" mt="2">
                                <b>Origin:</b> {flights[key].legs[0].origin.name}
                            </Text>
                            <Text align="center" mt="2">
                                <b>OriginCode:</b> {flights[key].legs[0].origin.display_code}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Destination:</b> {flights[key].legs[0].destination.name}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Destination:</b> {flights[key].legs[0].destination.display_code}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Departure Time:</b> {flights[key].legs[0].departure}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Arrival Time:</b> {flights[key].legs[0].arrival}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Carrier:</b> {flights[key].legs[0].carriers[0].name}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Stops:</b> {flights[key].legs[0].stop_count}
                            </Text>
                            {flights[key].legs[0].stop_count > 0 ? (
                                <div>
                                    {flights[key].legs[0].stops.map((stop, index) => (
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


                            {tripType === 'roundTrip' && flights[key].legs[1].departure.slice(0, 10) === returnDate && (
                                <div>
                                    <Text align="center" mt="2">
                                        <b>ReturnOrigin:</b> {flights[key].legs[1].origin.name}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return OriginCode:</b> {flights[key].legs[1].origin.display_code}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Destination:</b> {flights[key].legs[1].destination.name}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Destination:</b> {flights[key].legs[1].destination.display_code}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Departure Time:</b> {flights[key].legs[1].departure}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Arrival Time:</b> {flights[key].legs[1].arrival}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Carrier:</b> {flights[key].legs[1].carriers[0].name}
                                    </Text>
                                    <Text align="center" mt="2">
                                        <b>Return Stops:</b> {flights[key].legs[1].stop_count}
                                    </Text>
                                    {flights[key].legs[1].stop_count > 0 ? (
                                        <div>
                                            {flights[key].legs[1].stops.map((stop, index) => (
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


                            {flights[key].is_eco_contender && (
                                <>
                                    <Text align="center" mt="2">
                                        <span style={{ color: 'green' }}>
                                            <b>Eco flight:</b> {flights[key].is_eco_contender ? 'Yes' : 'No'}
                                        </span>

                                    </Text>
                                    <Text align="center" mt="2">
                                        <span style={{ color: 'green' }}>
                                            This flight emits
                                            <b> {Math.round(Math.abs(flights[key].eco_contender_delta))}% </b>
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
                                {flights[key].legs[0].stop_count > 0 && (
                                    flights[key].legs[0].stops.map((stop, index) => (
                                        <g key={index}>
                                            {/* Dot for stop */}
                                            <circle
                                                cx={`${((index + 1) / (flights[key].legs[0].stop_count + 1)) * 80 + 10}%`}
                                                cy="50%"
                                                r="4"
                                                fill="black"
                                            />

                                            {/* Display code for the stop */}
                                            <text
                                                x={`${((index + 1) / (flights[key].legs[0].stop_count + 1)) * 80 + 10}%`}
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
                                    {flights[key].legs[0].origin.display_code}
                                </text>

                                {/* Display code for destination */}
                                <text x="95%" y="50%" textAnchor="end" alignmentBaseline="middle" fontSize="12">
                                    {flights[key].legs[0].destination.display_code}
                                </text>
                            </svg>


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

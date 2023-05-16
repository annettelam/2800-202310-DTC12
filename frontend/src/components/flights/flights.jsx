import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';



export const Flights = () => {
    const navigate = useNavigate();
    //const user = JSON.parse(localStorage.getItem('user'));
    const [originDisplayCode, setOrigin] = useState('');
    const [destinationDisplayCode, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('oneWay');
    const [adults, setAdults] = useState(1);
    const [cabinClass, setCabinClass] = useState('economy');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

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
                    if (res.data.message === 'Success') {
                        navigate('/flightResults', {
                            state: {
                                origin: originDisplayCode,
                                destination: destinationDisplayCode,
                                departureDate: departureDate,
                                returnDate: returnDate,
                                tripType: tripType,
                                adults: adults,
                                cabinClass: cabinClass
                            }
                        });
                    } else {
                        setMsg(res.data);
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    };


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
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                >
                                    <option value="">Select origin</option>
                                    <option value="ATL">Atlanta - Hartsfield-Jackson Atlanta International Airport (ATL)</option>
                                    <option value="BOS">Boston - Logan International Airport (BOS)</option>
                                    <option value="ORD">Chicago - O'Hare International Airport (ORD)</option>
                                    <option value="DFW">Dallas - Dallas/Fort Worth International Airport (DFW)</option>
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
                            {msg && (
                                <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                                    {msg}
                                </p>
                            )}
                        </Form>

                    </div>



                </Card>

                <Container maxWidth="sm">
                    <Card bg="aliceblue" p="4" boxShadow="lg" rounded="md" mb="4">

                    </Card>
                </Container>

            </div>
        </ChakraProvider>
    );
};
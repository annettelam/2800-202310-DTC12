import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Popover, 
        PopoverTrigger, 
        PopoverContent, 
        ChakraProvider, 
        PopoverFooter,
        PopoverBody,
        PopoverCloseButton,
        Button, 
        Center} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import bkg from '../../bkg.jpg';
import './dashboard.css';
import {
    Heading,
    Text,
    VStack,
    Image,
    Box,
  } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [savedFlights, setSavedFlights] = useState([]);
    const [cityName, setCityName] = useState(''); 
    const [attractions, setAttractions] = useState([]);
    
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

    useEffect(() => {
        const fetchAttractions = async () => {
          try {
            const suggResponse = await axios.post('http://localhost:4000/suggestions', { 
              user 
            });
            setAttractions(suggResponse.data.attractions);
            setCityName(suggResponse.data.cityName);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAttractions();
      }, [user]);
    
    
    

    return (
      <ChakraProvider>
        <div
          className="dashboard-container"
          style={{
            backgroundImage: `url(${bkg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top 50px", // Move background down 50 pixels
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            fontFamily: "Questrial",
            minHeight: "95vh",
            overflowX: "auto", // Enable horizontal scrolling
            padding: "2rem 0", // Add top and bottom padding
          }}
        >
          <Container fluid className="px-3">
            <Row className="flex-nowrap">
              {" "}
              {/* Add flex-nowrap class to prevent wrapping */}
              <Col>
                <h2 className="mb-4">Flights</h2> {/* Category heading */}
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                  interval={3000} // Adjust the interval as needed
                >
                  {/* Wrap the scrollable content */}
                  {savedFlights.map((flight) => (
                    <Card
                      key={flight.id}
                      className="m-2"
                      style={{ minWidth: "200px", maxWidth: "300px" }}
                    >
                      <Card.Header>
                        <FaHeart
                          size={30}
                          color={isFlightSaved(flight.id) ? "red" : "black"}
                          fill={isFlightSaved(flight.id) ? "red" : "none"}
                          stroke={
                            isFlightSaved(flight.id) ? "none" : "currentColor"
                          }
                          strokeWidth="10"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSaveFlight(flight.id)}
                        />
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className="text-center">
                          ${flight.price.amount}
                        </Card.Title>
                        <Card.Text className="text-center">
                          <b>Origin:</b> {flight.legs[0].origin.name}
                        </Card.Text>
                        <Card.Text className="text-center">
                          <b>Origin Code:</b>{" "}
                          {flight.legs[0].origin.display_code}
                        </Card.Text>
                        {/* ... Rest of the flight details */}
                      </Card.Body>
                    </Card>
                  ))}
                </Carousel>
              </Col>
            </Row>
            {/* Repeat the above structure for other categories */}
            <Row className="flex-nowrap">
              {" "}
              {/* Add flex-nowrap class to prevent wrapping */}
              <Col>
                <h2 className="mb-4">Hotels</h2> {/* Category heading */}
                <div className="horizontal-scroll">
                  {" "}
                  {/* Wrap the scrollable content */}
                  {/* ... Hotel cards */}
                </div>
              </Col>
            </Row>
            {/* Add other categories here */}
            <Row className="flex-nowrap">
              <Col style={{ zIndex: 1 }}>
                <h2>Attractions in {cityName}</h2>
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                  interval={3000} // Adjust the interval as needed
                >
                  {/* Wrap the scrollable content */}
                  {attractions.length === 0 ? (
                    <Text>
                      Please save a flight first and wait a couple seconds.
                    </Text>
                  ) : (
                    attractions.map((attraction) => (
                      <Col
                        key={attraction.location_id}
                        style={{ minWidth: "200px", maxWidth: "300px" }}
                      >
                        <Card
                          className="m-2"
                          boxShadow="lg"
                          rounded="md"
                          overflow="hidden"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Image
                              src={attraction.photoUrl}
                              w="200px"
                              objectFit="cover"
                              alt={attraction.name}
                            />
                          </Box>
                          <VStack p="1" alignItems="start" spacing={2}>
                            <Heading size="md" alignItems="center">{attraction.name}</Heading>
                          </VStack>
                          <Popover
                            
                            placement="top-start"
                            closeOnBlur={false}
                          >
                            <PopoverTrigger>
                              <Button className="questrial-font">
                                Learn More
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                color="white"
                                bg="blue.700"
                                borderColor="blue.800"
                                w="250px"
                            >
                            <PopoverCloseButton />
                            <PopoverBody
                                className="questrial-font"
                                style={{ overflowWrap: "break-word" }}
                            >
                                {attraction.description}
                            </PopoverBody>
                            <PopoverFooter
                                border="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                pb={4}
                            ></PopoverFooter>
                            </PopoverContent>
                          </Popover>
                        </Card>
                      </Col>
                    ))
                  )}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
      </ChakraProvider>
    );
};


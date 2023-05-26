import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  ChakraProvider,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  Button as ChakraButton,
  Flex,
  Box,
  Center,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton
} from '@chakra-ui/react';
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
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Ecopacking } from '../ecopacking/ecopacking';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import landingPlane from '../flights/landing-airplane.png';
import takeoffPlane from '../flights/takeoff-airplane.png';
import { formatTime, formatDuration, formatStopDisplay } from '../flights/flights.jsx';
import sustainabilityIcon from '../hotels/planet-earth.png';

export const Dashboard = ({ isNavbarOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [savedFlights, setSavedFlights] = useState([]);
  const [savedHotels, setSavedHotels] = useState([]);
  const [cityName, setCityName] = useState('');
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      navigate('/login');
    }
    setUser(JSON.parse(localStorage.getItem('user')));

    // Get saved flights and hotels from localStorage
    if (localStorage.getItem('user') !== null) {
      const savedFlights = JSON.parse(localStorage.getItem('user')).savedFlights;
      setSavedFlights(savedFlights);
      const savedHotels = JSON.parse(localStorage.getItem('user')).savedHotels;
      setSavedHotels(savedHotels);
    }
  }, [navigate]);

  // Modal for hotel details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const openModal = (hotelId) => {
    setSelectedHotelId(hotelId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedHotelId(null);
    setIsModalOpen(false);
  };

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

  // Check if hotel is saved
  const isHotelSaved = (hotelId) => {
    return savedHotels.find((hotel) => hotel.hotel_id === hotelId) !== undefined;
  };

  // Save hotel
  const handleSaveHotel = async (hotelId) => {
    console.log(hotelId);
    console.log(isHotelSaved(hotelId));
    if (!isHotelSaved(hotelId)) {
      // Update useState
      setSavedHotels([...savedHotels, hotelId]);
    } else {
      // Update useState
      const newSavedHotels = savedHotels.filter((savedHotel) => savedHotel.hotel_id !== hotelId);
      setSavedHotels(newSavedHotels);
    }
    // Find hotel object
    var hotel = savedHotels.find((hotel) => hotel.hotel_id === hotelId);
    // Create hotel object
    hotel = {
      hotel_id: hotelId,
      hotel_name: hotel.hotel_name,
      address: hotel.address,
      min_total_price: hotel.min_total_price,
      review_score: hotel.review_score,
      max_photo_url: hotel.max_photo_url,
      url: hotel.url,
      details: hotel.details
    };
    // Update database
    console.log(hotel);
    try {
      const response = await axios.post('http://localhost:4000/save-hotel', {
        hotel, user
      });
      console.log(response.data);
      // Update localStorage
      if (response.data === "Hotel saved") {
        user.savedHotels.push(hotel);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        user.savedHotels = user.savedHotels.filter((savedHotel) => savedHotel.hotel_id !== hotelId);
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
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
  }, []);

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
          minHeight: '100vh',
        }}
      >
        <Box // Create a box for Eco-Assistant
          position="absolute"
          top={isNavbarOpen ? '18rem' : '5rem'}
          transition="top 0.22s ease-in-out"
          right="1rem"
          display="flex"
          alignItems="center"
          bg="white"
          padding="0.5rem 1rem"
          borderRadius="md"
          boxShadow="md"
          zIndex="999"
        >
          <Ecopacking />
        </Box>

        <Container fluid className="px-3">
          <Row className="flex-nowrap py-4">
            <Col style={{ zIndex: 1 }}>
              <Box className='m-auto mb-2' p="3" boxShadow="lg" rounded="md" bg="teal" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%" }}>
                <Flex justifyContent="center">
                  <h2 style={{ color: "white" }}>Your Saved Flights</h2>
                </Flex>
              </Box>
              {savedFlights.length > 0 ? (
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop={true}
                  selectedItem={0}
                  interval={3000}
                  emulateTouch={true}
                  swipeable={true}
                >
                  {savedFlights.map((flight) => (
                    <Box key={flight.id} className='m-auto' p="4" boxShadow="lg" rounded="md" bg="white" mb="4" position="relative" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%" }}>
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
                        <Box p="1" alignItems="start">
                          <Text fontWeight="bold" fontSize="lg" mb="0">
                            <span style={{ color: 'green' }}>Eco Flight</span>
                          </Text>
                          <Text>
                            <span style={{ color: 'green' }}>
                              Produces <b>{Math.round(Math.abs(flight.eco_contender_delta))}%</b> less carbon emissions compared to similar flights.
                            </span>
                          </Text>
                        </Box>
                      )}

                      {/* Iterate over legs and display departure times */}
                      {flight.legs.map((leg, index) => (
                        <Box key={index} p="1" alignItems="start">
                          <hr />
                          <Heading size="md" alignItems="center">
                            {index === 0 ? 'Departure Flight' : 'Return Flight'}
                          </Heading>
                          <Text>
                            {leg.origin.name} - {leg.destination.name}
                          </Text>
                          <Text mt="1" mb="1">
                            <b>{`${formatTime(leg.departure)} - ${formatTime(leg.arrival)}`}</b>
                          </Text>
                          <Text mt="1" mb="1">{formatDuration(leg.duration)}</Text>
                          <Text mt="1" mb="1">{leg.carriers[0].name}</Text>
                          <Box display="flex" justifyContent="center" alignItems="center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100px"
                              className="m-auto"
                              style={{ maxWidth: '300px' }}
                            >
                              {/* Line connecting origin and destination */}
                              <line
                                x1="20%"
                                y1="50%"
                                x2="80%"
                                y2="50%"
                                stroke="black"
                                strokeWidth="4"
                                strokeLinecap="round"
                              />
                              {/* Origin circle */}
                              <circle
                                cx="20%"
                                cy="50%"
                                r="10"
                                fill="white"
                                stroke="black"
                                strokeWidth="4"
                              />
                              {/* Destination circle */}
                              <circle
                                cx="80%"
                                cy="50%"
                                r="10"
                                fill="white"
                                stroke="black"
                                strokeWidth="4"
                              />
                              {/* Airplane image */}
                              <image
                                href={index === 0 ? takeoffPlane : landingPlane}
                                x="20%"
                                y="35%"
                                width="20%"
                                height="30%"
                                transform={index === 0 ? 'rotate(45 30% 40%)' : 'rotate(-45 25% 45%)'}
                              />
                            </svg>
                          </Box>
                          <Text mt="1" mb="1">Stops: {formatStopDisplay(leg.stops)}</Text>
                        </Box>
                      ))}

                      {/* Button to view more details */}
                      <Box p="1">
                        <Center>
                          <Popover>
                            <PopoverTrigger>
                              <ChakraButton
                                colorScheme="teal"
                                variant="outline"
                                size="sm"
                              >
                                View Details
                              </ChakraButton>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverCloseButton />
                              <PopoverBody>
                                <VStack align="start">
                                  <Text>
                                    <b>Airlines:</b>
                                  </Text>
                                  {flight.carriers.map((carrier, index) => (
                                    <Text key={index}>{carrier.name}</Text>
                                  ))}
                                  <Text>
                                    <b>Duration:</b> {formatDuration(flight.duration)}
                                  </Text>
                                  <Text>
                                    <b>Stops:</b> {formatStopDisplay(flight.stops)}
                                  </Text>
                                </VStack>
                              </PopoverBody>
                              <PopoverFooter d="flex" justifyContent="flex-end">
                                <ChakraButton
                                  colorScheme="teal"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/flights/${flight.id}`)}
                                >
                                  Select
                                </ChakraButton>
                              </PopoverFooter>
                            </PopoverContent>
                          </Popover>
                        </Center>
                      </Box>
                    </Box>
                  ))}
                </Carousel>
              ) : (
                <Box className='m-auto' p="4" boxShadow="lg" rounded="md" bg="white" mb="4" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%" }}>
                  <Text>You have no saved flights.</Text>
                </Box>
              )}
            </Col>
            <Col style={{ zIndex: 1 }}>
              <Box className='m-auto mb-2' p="3" boxShadow="lg" rounded="md" bg="teal" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%" }}>
                <Flex justifyContent="center">
                  <h2 style={{ color: "white" }}>Your Saved Hotels</h2>
                </Flex>
              </Box>
              {savedHotels.length > 0 ? (
                <Row>
                  {savedHotels.map((hotel) => (
                    <Col key={hotel.hotel_id} sm={6} md={4} lg={3} className="mb-4">
                      <Card>
                        <Card.Img variant="top" src={hotel.max_photo_url} />
                        <Card.Body>
                          <Card.Title>{hotel.hotel_name}</Card.Title>
                          <Card.Text>{hotel.address}</Card.Text>
                          <Card.Text>
                            <b>Price:</b> ${hotel.min_total_price}
                          </Card.Text>
                          <Card.Text>
                            <b>Review Score:</b> {hotel.review_score}
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => window.open(hotel.url, "_blank")}
                          >
                            Book Now
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="ml-2"
                            onClick={() => handleSaveHotel(hotel.hotel_id)}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Box className='m-auto' p="4" boxShadow="lg" rounded="md" bg="white" mb="4" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%" }}>
                  <Text>You have no saved hotels.</Text>
                </Box>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </ChakraProvider>
  );
};

export default Dashboard;

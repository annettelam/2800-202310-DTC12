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
  Center
} from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';
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
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Ecopacking } from '../ecopacking/ecopacking';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import landingPlane from '../flights/landing-airplane.png';
import takeoffPlane from '../flights/takeoff-airplane.png';
import { formatTime, formatDuration, formatStopDisplay } from '../flights/flights.jsx';
import sustainabilityIcon from '../hotels/planet-earth.png';


export const Dashboard = () => {
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
    const hotel = savedHotels.find((hotel) => hotel.hotel_id === hotelId);
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
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top 50px", // Move background down 50 pixels
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          fontFamily: "Questrial",
          minHeight: "95vh",
          overflowX: "auto", // Enable horizontal scrolling
          padding: "2rem 0", // Add top and bottom padding
          position: "relative", // Add position relative
        }}
      >
        <Box // Create a box for Eco-Assistant
          position="absolute"
          top="1rem"
          right="1rem"
          display="flex"
          alignItems="center"
          bg="white"
          padding="0.5rem 1rem"
          borderRadius="md"
          boxShadow="md"
        >
          <Ecopacking />
        </Box>

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
                emulateTouch={true}
                swipeable={true}
              >
                {/* Wrap the scrollable content */}
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

              </Carousel>
            </Col>
          </Row>

          {/* Saved Hotels */}
          <Row className="flex-nowrap">
            <Col>
              <h2 className="mb-4">Your Saved Hotels</h2>
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={false}
                interval={3000}
                emulateTouch={true}
                swipeable={true}
              >
                {savedHotels.map((hotel) => {
                  const roundedPrice = hotel.min_total_price.toFixed(2);
                  const sustainability = hotel.details?.sustainability;
                  return (
                    <Box key={hotel.hotel_id} className='m-auto' p="4" boxShadow="lg" rounded="md" bg="white" mb="4" position="relative" w={{ base: "100%", sm: "60%", md: "40%", lg: "30%"}}>
                      <Flex direction="column" align="center">
                        <Box position="absolute" top="15px" right="15px" onClick={() => handleSaveHotel(hotel.hotel_id)}>
                          <FaHeart
                            size={30}
                            color={isHotelSaved(hotel.hotel_id) ? 'red' : 'black'}
                            fill={isHotelSaved(hotel.hotel_id) ? 'red' : 'none'}
                            stroke={isHotelSaved(hotel.hotel_id) ? 'none' : 'currentColor'}
                            strokeWidth="10"
                            style={{ cursor: 'pointer' }} />
                        </Box>

                        {/* Hotel Name */}
                        <Heading size={{ base: 'md', lg: 'lg' }} w='75%' textAlign="center" mb="4">
                          {hotel.hotel_name}
                        </Heading>

                        {/* Hotel Image */}
                        <Image src={hotel.max_photo_url} alt={hotel.hotel_name} w={{ base: '80%', sm: '65%', md: '55%', lg: '40%' }} h="auto" rounded="md" mb="4" />

                        {/* Booking Button */}
                        <Button size="md" onClick={() => window.location.href = hotel.url} className='mb-3'>
                          Book at Booking.com
                        </Button>

                        {/* Hotel Details */}
                        <Text fontSize="lg" textAlign="center" mb="2">
                          <b>Price:</b> ${roundedPrice} CAD
                        </Text>
                        <Text fontSize="lg" textAlign="center" mb="2">
                          <b>Address:</b> {hotel.address}
                        </Text>
                        <Text fontSize="lg" textAlign="center" mb="2">
                          <b>Rating:</b> {hotel.review_score !== null ? `${hotel.review_score} / 10` : 'No reviews yet'}
                        </Text>

                        {/* Sustainability Initiatives */}
                        {sustainability && (
                          <Box textAlign="center" mb="4" style={{ width: "100%" }}>
                            <Text fontSize="lg" fontWeight="bold" mb="2" style={{ color: 'green' }}>
                              Eco-Friendly Property
                            </Text>
                            <Box display="flex" alignItems="center" justifyContent="center">
                              {sustainability.sustainability_page.tier === 'bronze' && (
                                <img
                                  src={sustainabilityIcon}
                                  alt="Sustainability Icon"
                                  style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                />
                              )}
                              {sustainability.sustainability_page.tier === 'silver' && (
                                <>
                                  <img
                                    src={sustainabilityIcon}
                                    alt="Sustainability Icon"
                                    style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                  />
                                  <img
                                    src={sustainabilityIcon}
                                    alt="Sustainability Icon"
                                    style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                  />
                                </>
                              )}
                              {sustainability.sustainability_page.tier === 'gold' && (
                                <>
                                  <img
                                    src={sustainabilityIcon}
                                    alt="Sustainability Icon"
                                    style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                  />
                                  <img
                                    src={sustainabilityIcon}
                                    alt="Sustainability Icon"
                                    style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                  />
                                  <img
                                    src={sustainabilityIcon}
                                    alt="Sustainability Icon"
                                    style={{ width: "20px", height: "20px", marginRight: "4px" }}
                                  />
                                </>
                              )}
                            </Box>
                            
                            {/* Open Modal Button */}
                            <ChakraButton colorScheme="green" height={8} size="md" borderRadius="md" _hover={{ bg: 'green.600' }} _active={{ bg: 'green.700' }} mt={2}
                              onClick={() => openModal(hotel.hotel_id)}>
                              Read More
                            </ChakraButton>

                            {/* Modal for Sustainability Intiatives */}
                            <Modal isOpen={isModalOpen && selectedHotelId === hotel.hotel_id} onClose={closeModal} size="2xl">
                              <ModalOverlay />
                              <ModalContent bg="green.300">
                                <ModalHeader>{hotel.name}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                  <h4 mb="2" style={{ fontWeight: 'bold' }}>Sustainability Initiatives</h4>
                                  {sustainability.sustainability_page.efforts.map((effort) => (
                                    <Box key={effort.title} mb="4">
                                      <Text fontSize="lg" fontWeight="bold" mb="2">{effort.title}</Text>
                                      <ul style={{ listStyleType: "none" }}>
                                        {effort.steps.map((step) => (
                                          <li key={step} style={{ marginTop: 5 }}>{step}.</li>
                                        ))}
                                      </ul>
                                    </Box>
                                  ))}
                                </ModalBody>
                                <ModalFooter>
                                  <ChakraButton colorScheme='blue' mr={3} onClick={closeModal}>Close</ChakraButton>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  );
                })}
                
              </Carousel>
            </Col>
          </Row>
    
          <Row className="flex-nowrap">
            <Col style={{ zIndex: 1 }}>
              <h2>Attractions in {cityName}</h2>
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                interval={3000} // Adjust the interval as needed
                emulateTouch={true}
                swipeable={true}
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
                            <ChakraButton className="questrial-font">
                              Learn More
                            </ChakraButton>
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





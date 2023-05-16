import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Container, Box, Heading, Text, FormControl, FormLabel, Input, Select, Button as ChakraButton, Flex, Image } from '@chakra-ui/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import cities from './cities';
import { Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

export const Hotels = () => {
    const navigate = useNavigate();

    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [hotels, setHotels] = useState({});
    const [savedHotels, setSavedHotels] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const isHotelSaved = (hotelId) => {
        return savedHotels.includes(hotelId);
    };

    const handleSaveHotel = async (hotelId) => {
        console.log(hotelId);
        console.log(isHotelSaved(hotelId));
        if (!isHotelSaved(hotelId)) {
            setSavedHotels([...savedHotels, hotelId]);
        } else {
            const newSavedHotels = savedHotels.filter((savedHotelId) => savedHotelId !== hotelId);
            setSavedHotels(newSavedHotels);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(city, checkInDate, checkOutDate, numAdults, numRooms);

        try {
            const response = await axios.post('http://localhost:4000/hotels', {
                city,
                checkInDate,
                checkOutDate,
                numAdults,
                numRooms
            });
            console.log(response.data);
            setHotels(response.data);
        } catch (error) {
            console.log(error);
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
                <Container maxWidth="md">
                    <Box p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center">Hotels</Heading>
                        <Text align="center" mt="2">
                            Search for Hotels here.
                        </Text>

                        <form onSubmit={handleSubmit}>
                            <FormControl mt="4">
                                <FormLabel>City</FormLabel>
                                <Select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                >
                                    <option value="" style={{color:'grey'}}>Select a city</option>
                                    {Object.keys(cities).map((cityOption) => (
                                        <option key={cityOption} value={cityOption}>
                                            {cityOption}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Check-In Date</FormLabel>
                                <Input
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                />
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Check-Out Date</FormLabel>
                                <Input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                />
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Number of Adults</FormLabel>
                                <Input
                                    type="number"
                                    value={numAdults}
                                    onChange={(e) => setNumAdults(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                />
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Number of Rooms</FormLabel>
                                <Input
                                    type="number"
                                    value={numRooms}
                                    onChange={(e) => setNumRooms(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                />
                            </FormControl>

                            <ChakraButton type="submit" colorScheme="blue" mt="4">
                                Search
                            </ChakraButton>
                        </form>
                    </Box>
                </Container>
                <Container className="hotel-results" maxWidth="6xl">
                    {Object.keys(hotels).map((hotelId) => {
                        const hotel = hotels[hotelId];
                        const roundedPrice = hotel.min_total_price.toFixed(2);

                        return (
                            <Box key={hotelId} p="4" boxShadow="lg" rounded="md" bg="white" mb="4" position="relative">
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
                                    <Heading size={{base:'md', lg:'lg'}} w='75%' textAlign="center" mb="4">
                                        {hotel.hotel_name}
                                    </Heading>
                                    <Image src={hotel.max_photo_url} alt={hotel.hotel_name} w={{base: '80%', sm: '65%', md: '55%', lg: '40%' }} h="auto" rounded="md" mb="4" />
                                    <Text fontSize="lg" textAlign="center" mb="2">
                                        <b>Price:</b> ${roundedPrice} CAD
                                    </Text>
                                    <Text fontSize="lg" textAlign="center" mb="2">
                                        <b>Address:</b> {hotel.address}
                                    </Text>
                                    <Text fontSize="lg" textAlign="center" mb="4">
                                        <b>Rating:</b> {hotel.review_score !== null ? `${hotel.review_score} / 10` : 'No reviews yet'}
                                    </Text>
                                    <Button
                                        size="md"
                                        onClick={() => window.location.href = hotel.url}
                                    >
                                        Book at Booking.com
                                    </Button>
                                </Flex>
                            </Box>
                        );
                    })}
                </Container>
            </div>
        </ChakraProvider>
    );
};
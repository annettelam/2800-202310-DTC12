import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Container, Box, Heading, Text, FormControl, FormLabel, Input, Select, Button as ChakraButton } from '@chakra-ui/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import cities from './cities';

export const Hotels = () => {
    const navigate = useNavigate();

    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [hotels, setHotels] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

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
                <Container className='hotel-results' maxWidth="6xl">
                    {Object.keys(hotels).map((hotelId) => (
                        <Box key={hotelId} p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                            <Heading align="center">{hotels[hotelId].hotel_name}</Heading>
                            <img src={hotels[hotelId].main_photo_url} alt={hotels[hotelId].hotel_name} style={{ width: '15%', height: 'auto' }} />
                            <Text align="center" mt="2">
                                <b>Price:</b> ${hotels[hotelId].min_total_price}
                            </Text>
                            <Text align="center" mt="2">
                                <b>Address:</b> {hotels[hotelId].address}
                            </Text>
                            {hotels[hotelId].review_score !== null ? (
                                <Text align="center" mt="2">
                                    <b>Rating:</b> {hotels[hotelId].review_score} / 10
                                </Text>
                            ) : (
                                <Text align="center" mt="2">
                                    <b>Rating:</b> No reviews yet
                                </Text>
                            )}
                        </Box>
                    ))}
                </Container>
            </div>
        </ChakraProvider>
    );
};
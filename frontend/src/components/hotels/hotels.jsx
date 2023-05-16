import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Heading, Text, FormControl, FormLabel, Input, Select, Button as ChakraButton } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';

export const Hotels = () => {
    const navigate = useNavigate();

    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState('');
    const [numRooms, setNumRooms] = useState('');

    const cities = ['City 1', 'City 2', 'City 3'];

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
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
                <Container maxWidth="sm">
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
                                >
                                    <option value="">Select a city</option>
                                    {cities.map((cityOption) => (
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
                                />
                            </FormControl>

                            <ChakraButton type="submit" colorScheme="blue" mt="4">
                                Search
                            </ChakraButton>
                        </form>
                    </Box>
                </Container>
                
                <Container className='hotel-results' maxWidth="sm"></Container>
            </div>
        </ChakraProvider>
    );
};
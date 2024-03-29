import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, ChakraProvider, Container, Box, Heading, Text, FormControl, FormLabel, Input, Select, Button as ChakraButton, Flex, Image, HStack, useNumberInput } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import cities from './cities';
import { FaHeart } from 'react-icons/fa';
import sustainabilityIcon from './planet-earth.png';

export const Hotels = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    // Search form
    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numAdults, setNumAdults] = useState(1);
    const [numRooms, setNumRooms] = useState(1);
    // Increment/Decrement for adults
    const {
        getInputProps: getAdultsInputProps,
        getIncrementButtonProps: getAdultsIncProps,
        getDecrementButtonProps: getAdultsDecProps,
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 10,
    });
    const adultsInput = getAdultsInputProps();
    const adultsInc = getAdultsIncProps();
    const adultsDec = getAdultsDecProps();
    // Increment/Decrement for rooms
    const {
        getInputProps: getRoomsInputProps,
        getIncrementButtonProps: getRoomsIncProps,
        getDecrementButtonProps: getRoomsDecProps,
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 10,
    });
    const roomsInput = getRoomsInputProps();
    const roomsInc = getRoomsIncProps();
    const roomsDec = getRoomsDecProps();

    // Hotels
    const [hotels, setHotels] = useState({});
    const [savedHotels, setSavedHotels] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    // Execute on page load
    useEffect(() => {
        // Check if user is logged in
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
        // Save user from localStorage
        setUser(JSON.parse(localStorage.getItem('user')));
        // Get saved hotels from localStorage
        if (localStorage.getItem('user') !== null) {
            const savedHotels = JSON.parse(localStorage.getItem('user')).savedHotels;
            const savedHotelIds = savedHotels.map((savedHotel) => savedHotel.hotel_id);
            setSavedHotels(savedHotelIds);
        }
    }, [navigate]);

    // Check if hotel is saved
    const isHotelSaved = (hotelId) => {
        return savedHotels.includes(hotelId);
    };

    // Save hotel
    const handleSaveHotel = async (hotelId) => {
        if (!isHotelSaved(hotelId)) {
            // Update useState
            setSavedHotels([...savedHotels, hotelId]);
        } else {
            // Update useState
            const newSavedHotels = savedHotels.filter((savedHotelId) => savedHotelId !== hotelId);
            setSavedHotels(newSavedHotels);
        }
        // Find hotel object
        var hotel = hotels.find((hotel) => hotel.hotel_id === hotelId);
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
        try {
            const response = await axios.post('https://planetpass-backend.onrender.com/save-hotel', {
                hotel, user
            });
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

    // Get hotels on form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('https://planetpass-backend.onrender.com/hotels', {
                city,
                checkInDate,
                checkOutDate,
                numAdults,
                numRooms,
                page: 1 // Start on page 1 (First 4 hotels)
            });
            // Update useState
            setHotels(response.data.hotels);
            setHasNextPage(response.data.hasNextPage);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    // Load more hotels
    const loadMoreHotels = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://planetpass-backend.onrender.com/hotels', {
                city,
                checkInDate,
                checkOutDate,
                numAdults,
                numRooms,
                page: Math.ceil(hotels.length / 4) + 1 // Calculate the next page based on the current number of hotels
            });
            // Update useState
            setHotels((prevHotels) => [...prevHotels, ...response.data.hotels]);
            setHasNextPage(response.data.hasNextPage);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <ChakraProvider>
            <div
                className="dashboard-container"
                style={{
                    backgroundImage: `url(${dashBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top 50px',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    fontFamily: 'Questrial',
                    minHeight: '100vh',
                }}
            >
                {/* Search Form */}
                <Container maxWidth="md">
                    <Box p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center">Hotels</Heading>
                        <Text align="center" mt="2">
                            Search for Hotels here.
                        </Text>
                        <form onSubmit={handleSubmit}>
                            <FormControl mt="4" isRequired>
                                <FormLabel>City</FormLabel>
                                <Select
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    required
                                >
                                    <option value="" style={{ color: 'grey' }}>Select a city</option>
                                    {Object.keys(cities).map((cityOption) => (
                                        <option key={cityOption} value={cityOption}>
                                            {cityOption}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt="4" isRequired>
                                <FormLabel>Check-In Date</FormLabel>
                                <Input
                                name="checkInDate"
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    min={new Date().toISOString().split('T')[0]} // Set min date to today
                                    max={checkOutDate} // Set max date to checkOutDate
                                    required
                                />
                            </FormControl>

                            <FormControl mt="4" isRequired>
                                <FormLabel>Check-Out Date</FormLabel>
                                <Input
                                name="checkOutDate"
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                    min={checkInDate} // Set min date to checkInDate
                                    required
                                />
                            </FormControl>

                            <FormControl mt="4" isRequired>
                                <FormLabel>Number of Adults</FormLabel>
                                <HStack maxW='250px' className='m-auto'>
                                    <ChakraButton colorScheme="teal"{...adultsDec} >-</ChakraButton>
                                    <Input
                            
                                        type="number"
                                        value={numAdults}
                                        onChange={(e) => setNumAdults(e.target.value)}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                        textAlign="center"
                                        {...adultsInput}
                                        required
                                    />
                                    <ChakraButton id="increaseBtn" colorScheme="teal"{...adultsInc} >+</ChakraButton>
                                </HStack>
                            </FormControl>

                            <FormControl mt="4" isRequired>
                                <FormLabel>Number of Rooms</FormLabel>
                                <HStack maxW='250px' className='m-auto'>
                                    <ChakraButton colorScheme="teal"{...roomsDec} >-</ChakraButton>
                                    <Input
                                        type="number"
                                        value={numRooms}
                                        onChange={(e) => setNumRooms(e.target.value)}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                                        textAlign="center"
                                        {...roomsInput}
                                        required
                                    />
                                    <ChakraButton id="increaseBtnRoom" colorScheme="teal"{...roomsInc} >+</ChakraButton>
                                </HStack>
                            </FormControl>

                            <Flex justifyContent="center">
                                <ChakraButton id="submitButton" type="submit" colorScheme="teal" mt="4" w="50%">
                                    Search
                                </ChakraButton>
                            </Flex>
                        </form>
                    </Box>
                </Container>

                {/* Hotels Search Results */}
                <Container className="hotel-results" maxWidth="6xl">
                    { Object.keys(hotels).length > 0 && (
                        <Box p="4" boxShadow="lg" rounded="md" bg="white" mb="4">
                            <Heading textAlign="center">Hotel Results</Heading>
                            <Text fontWeight="bold" textAlign="center">Sorted by Price: Lowest to Highest</Text>
                        </Box>
                    )}
                    {Object.keys(hotels).map((hotelId) => {
                        const hotel = hotels[hotelId];
                        const roundedPrice = hotel.min_total_price.toFixed(2);
                        const sustainability = hotel.details?.sustainability;
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

                                    {/* Hotel Name */}
                                    <Heading size={{ base: 'md', lg: 'lg' }} w='75%' textAlign="center" mb="4">
                                        {hotel.hotel_name}
                                    </Heading>

                                    {/* Hotel Image */}
                                    <Image src={hotel.max_photo_url} alt={hotel.hotel_name} w={{ base: '80%', sm: '65%', md: '55%', lg: '40%' }} h="auto" rounded="md" mb="4" />

                                    {/* Booking Button */}
                                    <ChakraButton
                                        size="md"
                                        onClick={() => (window.location.href = hotel.url)}
                                        className="mb-3"
                                        colorScheme="teal"
                                    >
                                        Book at Booking.com
                                    </ChakraButton>

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
                </Container>

                {/* Load More Button */}
                {hasNextPage && (
                    <Flex justify="center" mt="4">
                        <ChakraButton onClick={loadMoreHotels} colorScheme="teal">
                            Load More
                        </ChakraButton>
                    </Flex>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                    <Flex justify="center" mt="4">
                        <CircularProgress isIndeterminate color="teal" />
                    </Flex>
                )}
            </div>
        </ChakraProvider>
    );
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChakraProvider,
    Heading,
    Container,
    Box,
    Card,
    Divider,
    Text,
    Button,
} from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import '../../fonts.css';
import bkg from '../../bkg.jpg';

export const Profile = () => {
    const navigate = useNavigate(); // Navigation function provided by react-router-dom
    const [user, setUser] = useState({}); // State variable to store user data

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login'); // Redirect to login if not logged in
        }
        setUser(JSON.parse(localStorage.getItem('user'))); // Retrieve and parse user data from local storage
    }, [navigate]);

    return (
        <ChakraProvider>
            <div
                className="dashboard-container"
                style={{
                    backgroundImage: `url(${bkg})`, // Set background image
                    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
                    backgroundPosition: 'center top 50px', // Set background image position
                    backgroundAttachment: 'fixed', // Fix background image position
                    backgroundSize: 'cover', // Scale background image to cover container
                    fontFamily: 'Questrial', // Set font family
                    minHeight: '95vh', // Set minimum height of container
                }}
            >
                <Container>
                    <Box p="3" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center" fontFamily="Questrial">
                            Welcome, {user.firstName} {user.lastName}! {/* Display user's first and last name */}
                        </Heading>
                        <Text align="center" mt="2">
                            Here are your account details for PlanetPass.
                        </Text>
                    </Box>

                    <Box mb="4">
                        <Card maxWidth="500px" mx="auto" bg="aliceblue" p="5">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box>
                                    <strong>Username:</strong> {user.username} {/* Display username */}
                                </Box>
                                <Divider my="2" /> {/* Add a horizontal divider */}
                                <Box>
                                    <strong>First Name:</strong> {user.firstName} {/* Display first name */}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>Last Name:</strong> {user.lastName} {/* Display last name */}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>Email:</strong> {user.email} {/* Display email */}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>City:</strong> {user.city} {/* Display city */}
                                </Box>
                            </Box>
                        </Card>
                    </Box>

                    <Box mb="4">
                        <Card maxWidth="500px" mx="auto" bg="aliceblue" p="5">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Text align="center" mt="2">
                                    If you would like to change your password, click the button below.
                                </Text>
                                <Button colorScheme="teal" onClick={() => navigate('/forgotpassword')}>
                                    Change Password {/* Button to navigate to the password change page */}
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </div>
        </ChakraProvider>
    );
};

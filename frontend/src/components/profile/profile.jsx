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
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [navigate]);

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
                    minHeight: '95vh',
                }}
            >
                <Container>
                    <Box p="3" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center" fontFamily="Questrial">
                            Welcome, {user.firstName} {user.lastName}!
                        </Heading>
                        <Text align="center" mt="2">
                            Here are your account details for PlanetPass.
                        </Text>
                    </Box>

                    <Box mb="4">
                        <Card maxWidth="500px" mx="auto" bg="aliceblue" p="5">
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box>
                                    <strong>Username:</strong> {user.username}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>First Name:</strong> {user.firstName}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>Last Name:</strong> {user.lastName}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>Email:</strong> {user.email}
                                </Box>
                                <Divider my="2" />
                                <Box>
                                    <strong>City:</strong> {user.city}
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
                                <Button colorScheme="blue" onClick={() => navigate('/forgotpassword')}>
                                    Change Password
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </div>
        </ChakraProvider>
    );
};

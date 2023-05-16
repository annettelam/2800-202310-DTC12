import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChakraProvider, Heading, Container, Box, Card,
    Divider, Avatar, Text, Flex
} from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';

export const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

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
                <Container>
                    <Box p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center" fontFamily="Questrial">Welcome, {user.firstName} {user.lastName}!</Heading>
                        <Text align="center" mt="2">
                            Here are your account details.
                        </Text>
                    </Box>

                    <Card maxWidth="500px" mx="auto">
                        <Box p="5" textAlign="center">
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
                        </Box>
                    </Card>
                </Container>
            </div>
        </ChakraProvider>
    );
};

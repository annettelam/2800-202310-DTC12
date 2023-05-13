import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';

export const Flights = () => {
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
                        <Heading align="center">
                            Welcome, {user.firstName} {user.lastName}!
                        </Heading>
                        <Text align="center" mt="2">
                            These are your FLIGHT details.
                        </Text>
                    </Box>
                </Container>
            </div>
        </ChakraProvider>
    );
};

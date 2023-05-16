import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Button,
    Stack,
} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import { Container } from 'react-bootstrap';
import './dashboard.css';

export const Dashboard = (props) => {
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
                <Container>
                    <Box p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center">Welcome, {user.firstName} {user.lastName}!</Heading>
                        <Text align="center" mt="2">
                            This is where you can view your trip details.
                        </Text>
                    </Box>
                </Container>
                <Flex justifyContent="center" alignItems="center" minHeight="25vh">
                    <Stack
                        spacing={4}
                        direction={['column', 'row']} // Stack cards vertically on small screens, horizontally on larger screens
                        align="center"
                        className="card-stack"
                    >
                        <Card>
                            <CardHeader>
                                <Heading size="md">User dashboard</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, illum.
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Heading size="md">User dashboard</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, illum.
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Heading size="md">User dashboard</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, illum.
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Heading size="md">User dashboard</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, illum.
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                    </Stack>
                </Flex>
            </div>
        </ChakraProvider>
    );
};


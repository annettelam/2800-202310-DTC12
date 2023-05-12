import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Text, Card, CardHeader, CardBody, CardFooter, Flex, SimpleGrid, Button } from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { Footer } from '../footer/footer';
import dashBackground from '../../dashbkg.jpg';
import { Container } from 'react-bootstrap';
import './dashboard.css';

export const Dashboard = (props) => {
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
                <br></br>
                <Container>
                    <Box p="4" boxShadow="lg" rounded="md" bg="aliceblue" mb="4">
                        <Heading align="center">Welcome, {user.firstName} {user.lastName}!</Heading>
                        <Text align="center" mt="2">
                            This is where you can view your trip details.
                        </Text>
                    </Box>
                </Container>
                <Flex justifyContent="center" alignItems="center" minHeight="25vh">
                    <SimpleGrid
                        spacing={8}
                        templateColumns="repeat(4, 1fr)"
                        justifyItems="center"
                        className="simple-grid"
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
                    </SimpleGrid>
                </Flex>
            </div>
            <Footer />
        </ChakraProvider>
    );
};

import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import wireframe from '../../wireframe.png';

export const Home = (props) => {
    return (
        <ChakraProvider>
            <br></br>
            <br></br>
            <div
                style={{
                    background: 'linear-gradient(to top, #0CBAA6, white)',
                    fontFamily: 'Questrial',
                    minHeight: '100vh',
                }}
            >
                <Container fluid>
                    <Row>
                        <Col className="p-0" xs={6} md={6}>
                            <div className="h-100 d-flex align-items-center justify-content-center">
                                <Box maxW="32rem" textAlign="center">
                                    <Heading mb={4}>LET'S BEGIN YOUR JOURNEY</Heading>
                                    <Text fontSize="xl">Lorem ipsum dolor sit amet.</Text>
                                    <Button size="lg" colorScheme="green" mt="24px">
                                        Lorem ipsum.
                                    </Button>
                                </Box>
                            </div>
                        </Col>
                        <Col className="p-0" xs={6} md={6}>
                            <div className="h-100 d-flex align-items-center justify-content-center">
                                <Image src={wireframe} alt="main2" fluid />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ChakraProvider>
    );
};

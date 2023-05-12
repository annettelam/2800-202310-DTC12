import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../../fonts.css';
import './404.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import notfoundimage from '../../404-image.jpg';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <ChakraProvider>
            <Box className="not-found-container">
                <Image src={notfoundimage} alt="404 Error" fluid className="not-found-image m-auto" />
                <Box className="not-found-content">
                    <Container className='error-container'>
                        <Row>
                            <Col>
                                <Heading as="h1" size="2xl" mt={5} color="white">
                                    Oops! We've lost our way.
                                </Heading>
                                <Text fontSize="2xl" mt={2} color="white">
                                    Let's get back on track and continue our travel journey together.
                                </Text>
                                <Button colorScheme="blue" mt={5} onClick={goBack}>
                                    Go Back
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Container, SimpleGrid, Flex, Image, Divider, Collapse } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import navlogo from '../../navlogo.png';

export const Home = (props) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const onToggle1 = () => {
        setIsOpen1(!isOpen1);
    };

    const onToggle2 = () => {
        setIsOpen2(!isOpen2);
    };


    return (
        <ChakraProvider>
            <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh">
                <Container maxWidth="container.xl">
                    <Flex direction="column" align="center" justify="center" minHeight="50vh">
                        <Box bg="aliceblue.500" color="white" py="8" px="12" borderRadius="xl" textAlign="center">
                            <Flex justify="center">
                                <Image src={navlogo} alt="Planetpass Logo" boxSize="250px" objectFit="contain" />
                            </Flex>
                            <Heading as="h1" size="2xl" mb="4">
                                Welcome to PlanetPass.
                            </Heading>
                            <Text fontSize="xl" mb="4">
                                Explore the world with ease.
                            </Text>
                            {/* <Button colorScheme="whiteAlpha" size="lg">
                                Get Started
                            </Button> */}
                        </Box>
                    </Flex>
                    <Divider />
                    <br></br>
                    <Box>
                        {/* Features Section */}
                        <SimpleGrid columns={[1, 2]} spacing="8" align="center">
                            {/* Feature 1 */}
                            <Box>
                                {/* Add icon */}
                                <>
                                    <Button onClick={onToggle1}> About Us </Button>
                                    <Collapse in={isOpen1} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="gray.300"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Welcome to aether, a dynamic venture brought to life by four BCIT CST students: Michelle Kwok, Annette Lam, Lisa Jung, and Mikko Sio. Bound by their shared passion for coding and their deep love for traveling, these aspiring individuals have come together to create something different. 
                                            <br />
                                            <br />
                                            Driven by the belief that technology has the power to transform the way we explore the world, aether combines their technical expertise with their insatiable wanderlust. 
                                            <br />
                                            <br />
                                            Join us on this exhilarating journey as aether revolutionizes the intersection of coding and travel, providing unforgettable experiences that inspire, inform, and connect people from all corners of the globe.
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>
                            {/* Feature 2 */}
                            <Box>
                                {/* Add icon */}
                                <>
                                    <Button onClick={onToggle2}> Our Mission </Button>
                                    <Collapse in={isOpen2} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="gray.300"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Placeholder content for Feature 2.
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>

                            <br></br>
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
        </ChakraProvider>
    );
};

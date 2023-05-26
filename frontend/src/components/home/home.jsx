import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Container, SimpleGrid, Flex, Image, Divider, Collapse } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import navlogo from '../../navlogo.png';

export const Home = (props) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const onToggle1 = () => {
        setIsOpen1(!isOpen1);
    };

    const onToggle2 = () => {
        setIsOpen2(!isOpen2);
    };

    const onToggle3 = () => {
        setIsOpen3(!isOpen3);
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
                        <SimpleGrid columns={[1, 2, 3]} spacing="8" align="center">
                            {/* Feature 1 */}
                            <Box>
                                {/* Add icon */}
                                <>
                                    <Button onClick={onToggle1} bg="teal.50"> Our Story </Button>
                                    <Collapse in={isOpen1} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="teal.50"
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
                                    <Button onClick={onToggle2} bg="teal.50"> Our Mission </Button>
                                    <Collapse in={isOpen2} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="teal.50"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            At aether, our mission is to harness the power of AI for the betterment of humanity. 
                                            Recognizing the significant environmental impact generated by the travel industry, we are committed to promoting the concept of sustainable travel without compromising convenience or breaking the bank.
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>
                            <Box>
                                {/* Add icon */}
                                <>
                                    <Button onClick={onToggle3} bg="teal.50"> Our App </Button>
                                    <Collapse in={isOpen3} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="teal.50"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Leveraging cutting-edge AI technologies, our platform offers innovative features that make eco-conscious choices easier for travelers:
                                            <br />
                                            <br />
                                            With our flight search, users can compare options based on carbon emissions, ensuring they can make informed decisions to reduce their carbon footprint. 
                                            <br />
                                            <br />
                                            Our hotel search showcases accommodations with sustainability initiatives, allowing users to choose environmentally friendly lodging. 
                                            <br />
                                            <br />
                                            We provide personalized recommendations for attractions based on destination. Additionally, our AI-powered packing list suggests sustainable and minimalist options, reducing waste.
                                            
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>
                            <br />
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
        </ChakraProvider>
    );
};

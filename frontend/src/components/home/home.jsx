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
                                <Heading as="h3" size="md" mb="2" color="white">
                                    Affordability
                                </Heading>
                                <>
                                    <Button onClick={onToggle1}>Discover</Button>
                                    <Collapse in={isOpen1} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="gray.300"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Placeholder content for Feature 1.
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>
                            {/* Feature 2 */}
                            <Box>
                                {/* Add icon */}
                                <Heading as="h3" size="md" mb="2" color="white">
                                    Sustainability
                                </Heading>
                                <>
                                    <Button onClick={onToggle2}>Discover</Button>
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
                            {/* Feature 3 */}
                            <Box>
                                {/* Add icon */}
                                <Heading as="h3" size="md" mb="2" color="white">
                                    Convenience
                                </Heading>
                                <>
                                    <Button onClick={onToggle3}>Discover</Button>
                                    <Collapse in={isOpen3} animateOpacity>
                                        <Box
                                            p="20px"
                                            color="black"
                                            mt="4"
                                            bg="gray.300"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Placeholder content for Feature 3.
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

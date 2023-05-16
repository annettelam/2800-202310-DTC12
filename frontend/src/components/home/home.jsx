import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Container, SimpleGrid, Flex, Image, Divider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import navlogo from '../../navlogo.png';

export const Home = (props) => {
    return (
        <ChakraProvider>
            <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh">
                <Container maxWidth="container.xl">
                    <Flex direction="column" align="center" justify="center" minHeight="50vh">
                        <Box bg="aliceblue.500" color="white" py="8" px="12" borderRadius="xl" textAlign="center">
                            <Flex justify="center" mb="4">
                                <Image src={navlogo} alt="Planetpass Logo" boxSize="250px" objectFit="contain" />
                            </Flex>
                            <Heading as="h1" size="2xl" mb="4">
                                Welcome to Planetpass!
                            </Heading>
                            <Text fontSize="xl" mb="4">
                                Explore the world with ease.
                            </Text>
                            <Button colorScheme="whiteAlpha" size="lg">
                                Get Started
                            </Button>
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
                                <Heading as="h3" size="lg" mb="2">
                                    Feature 1
                                </Heading>
                                <Text>
                                    Feature description 1
                                </Text>
                            </Box>

                            {/* Feature 2 */}
                            <Box>
                                {/* Add icon */}
                                <Heading as="h3" size="lg" mb="2">
                                    Feature 2
                                </Heading>
                                <Text>
                                    Feature description 2
                                </Text>
                            </Box>

                            {/* Feature 3 */}
                            <Box>
                                {/* Add icon */}
                                <Heading as="h3" size="lg" mb="2">
                                    Feature 3
                                </Heading>
                                <Text>
                                    Feature description 3
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <br></br>
                </Container>
            </Box>
        </ChakraProvider>
    );
};



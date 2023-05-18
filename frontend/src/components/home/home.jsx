import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    Button,
    Container,
    SimpleGrid,
    Flex,
    Image,
    Divider,
    Collapse,
} from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import navlogo from '../../navlogo.png';
import bkg5 from '../../bkg5.jpg';

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
            <div
                className="dashboard-container"
                style={{
                    backgroundImage: `url(${bkg5})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top 50px',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    fontFamily: 'Questrial',
                    minHeight: '100vh',
                    textAlign: 'center', // Center the text
                }}
            >
                <Container>
                    <Flex justify="center">
                        <Image
                            src={navlogo}
                            alt="Planetpass Logo"
                            boxSize="250px"
                            objectFit="contain"
                        />
                    </Flex>
                    <Heading as="h1" size="1xl" mb="4" textAlign="center"> {/* Center the heading */}
                        Welcome to Planetpass.
                    </Heading>
                    <Text fontSize="xl" mb="4" textAlign="center"> {/* Center the text */}
                        Explore the world with ease.
                    </Text>
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
                                <>
                                    <Button onClick={onToggle1}>Discover</Button>
                                    <Collapse in={isOpen1} animateOpacity>
                                        <Box
                                            p="40px"
                                            color="aliceblue"
                                            mt="4"
                                            bg="teal.500"
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
                                <Heading as="h3" size="lg" mb="2">
                                    Feature 2
                                </Heading>
                                <>
                                    <Button onClick={onToggle2}>Discover</Button>
                                    <Collapse in={isOpen2} animateOpacity>
                                        <Box
                                            p="40px"
                                            color="white"
                                            mt="4"
                                            bg="teal.500"
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
                                <Heading as="h3" size="lg" mb="2">
                                    Feature 3
                                </Heading>
                                <>
                                    <Button onClick={onToggle3}>Discover</Button>
                                    <Collapse in={isOpen3} animateOpacity>
                                        <Box
                                            p="40px"
                                            color="white"
                                            mt="4"
                                            bg="teal.500"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            Placeholder content for Feature 3.
                                        </Box>
                                    </Collapse>
                                </>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <br></br>
                </Container>
            </div>
        </ChakraProvider>
    );
};

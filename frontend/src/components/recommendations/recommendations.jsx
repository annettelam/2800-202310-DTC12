import React, { useState } from 'react';
import axios from 'axios';
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    Input,
    Button,
    Container,
    SimpleGrid,
    VStack,
    Card,
    Tooltip,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';
import bkg from '../../bkg.jpg';

export const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [city, setCity] = useState('');
    const [dates, setDates] = useState('');

    const generateRecommendations = async () => {
        if (city && dates) {
            const url = 'https://api.openai.com/v1/completions';
            const prompt = `You: I am traveling to ${city} from ${dates}. What environmentally friendly items should I pack?`;
            const payload = {
                prompt,
                max_tokens: 50,
                temperature: 0.7,
                n: 1,
                model: 'text-davinci-002'
            };
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`
            };

            try {
                const response = await axios.post(url, payload, { headers });
                const response_data = response.data;
                const recommendations = response_data.choices.map((choice) =>
                    choice.text.trim()
                );
                setRecommendations(recommendations);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <ChakraProvider>
            <Box
                className="dashboard-container"
                style={{
                    backgroundImage: `url(${bkg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top 50px', // Move background down 50 pixels
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    fontFamily: 'Questrial',
                    minHeight: '95vh'
                }}
                p={8}
            >
                <Container maxW="md">
                    <Heading mb={4} textAlign="center" color="white">
                        Enter your travel details.
                    </Heading>
                    <Box bg="white" p={4} rounded="md">
                        <VStack spacing={4} align="stretch">
                            <Input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city"
                            />
                            <Tooltip
                                label="Enter a single date (YYYY-MM-DD) or a range of dates (e.g. 'YYYY-MM-DD - YYYY-MM-DD')"
                                hasArrow
                                placement="bottom"
                            >
                                <Input
                                    type="text"
                                    id="dates"
                                    value={dates}
                                    onChange={(e) => setDates(e.target.value)}
                                    placeholder="Enter dates"
                                />
                            </Tooltip>
                            <Button colorScheme="blue" onClick={generateRecommendations}>
                                Generate List
                            </Button>
                        </VStack>
                    </Box>
                </Container>
                {recommendations.length > 0 && (
                    <Container maxW="lg" mt={8}>
                        <Heading mb={4} textAlign="center" color="white">
                            Generated Recommendations
                        </Heading>
                        <SimpleGrid columns={1} spacing={4}>
                            {recommendations.map((recommendation, index) => (
                                <Card key={index} bg="white" rounded="md" p={4}>
                                    <UnorderedList>
                                        <ListItem>{recommendation}</ListItem>
                                    </UnorderedList>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Container>
                )}
            </Box>
        </ChakraProvider>
    );
};

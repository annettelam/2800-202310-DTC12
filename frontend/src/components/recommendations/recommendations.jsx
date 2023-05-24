import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Text,
    Input,
    Button,
    Container,
    SimpleGrid,
    VStack,
    Card,
    Tooltip,
    UnorderedList,
    ListItem,
    Flex,
} from '@chakra-ui/react';

export const Recommendations = ({ flightId }) => {
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
                model: 'text-davinci-002',
            };
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI}`,
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

    const clearFields = () => {
        setCity('');
        setDates('');
        setRecommendations([]);
    };

    return (
        <Box>
            <Container maxW="md" bg="white" borderRadius="2xl" p="2">
                <Text mb={2} textAlign="center" color="#2F855A" fontWeight="bold">
                    Let's generate your eco-friendly packing list.
                </Text>
                <Box bg="white" p={2} rounded="md">
                    <VStack spacing={2} align="stretch">
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
                        <Flex justify="space-between" align="center">
                            <Button colorScheme="blue" onClick={generateRecommendations} w="80%">
                                Generate List
                            </Button>

                            <Flex justify="center" w="20%">
                                <Button variant="link" onClick={clearFields} color="blue.500">
                                    Clear
                                </Button>
                            </Flex>
                        </Flex>

                    </VStack>
                </Box>
            </Container>
            {recommendations.length > 0 && (
                <Container maxW="lg" mt={2}>
                    <SimpleGrid columns={1} spacing={4}>
                        {recommendations.map((recommendation, index) => {
                            const hasHyphen = recommendation.includes('-');
                            if (hasHyphen) {
                                const items = recommendation.split('-').map(item => item.trim());
                                return (
                                    <Card key={index} bg="white" rounded="md" p={4}>
                                        <UnorderedList>
                                            {items.map((item, itemIndex) => (
                                                <ListItem key={itemIndex}>{item}</ListItem>
                                            ))}
                                        </UnorderedList>
                                    </Card>
                                );
                            } else {
                                return (
                                    <Card key={index} bg="#F0FFF4" rounded="md" p={4}>
                                        {index === 0 ? <Text>{recommendation}</Text> : recommendation}
                                    </Card>
                                );
                            }
                        })}
                    </SimpleGrid>
                </Container>
            )}
        </Box>
    );
};

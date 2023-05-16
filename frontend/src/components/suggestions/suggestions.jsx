import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Heading,
  Text,
  Flex,
  VStack,
  Image,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import './suggestions.css';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

export const Suggestions = () => {
    const location = useLocation();
    const airportCode = location.state?.airportCode || '';
    console.log('Airport Code: ', airportCode);

    const getCityName = (airportCode) => {
        const airports = {
          ATL: 'Atlanta',
          BOS: 'Boston',
          ORD: 'Chicago',
          DFW: 'Dallas',
          IAH: 'Houston',
          JFK: 'New York',
          LAX: 'Los Angeles',
          MEX: 'Mexico City',
          MIA: 'Miami',
          YQB: 'Quebec City',
          SEA: 'Seattle',
          YYZ: 'Toronto',
          YVR: 'Vancouver',
        };
        return airports[airportCode] || '';
      };

    const cityName = getCityName(airportCode);
    console.log('City Name: ', cityName);

    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async () => {
          try {
            const attractionsResponse = await axios.get(`http://localhost:3001/suggestions/search?location=${cityName}`);
            console.log('Attractions Response: ', attractionsResponse);
            if (attractionsResponse.data) {
              setAttractions(attractionsResponse.data.attractions);
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        if (cityName) {
          fetchAttractions();
        }
      }, [cityName]);
    
    return (
        <ChakraProvider>
            <Box
                minHeight="100vh"
                backgroundImage={`url(${dashBackground})`}
                backgroundSize="cover"
                backgroundPosition="center"
            >
                <VStack minHeight="100vh" justifyContent="space-between">
                    <Box>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="100px"
                        >
                        <Heading
                            mb="30px"
                            fontSize={{ base: '3xl', md: '6xl' }}
                            fontWeight="bold"
                            color="white"
                        >
                            Let us help you plan your trip
                        </Heading>
                        </Flex>
                        <Box mt={6}>
                        <Heading as="h3" size="lg" mb={4}>
                            Attractions
                        </Heading>
                        {attractions.length === 0 ? (
                            <Text>No attractions found. Please find a flight first.</Text>
                        ) : (
                            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                            {attractions.map((attraction) => (
                                <Box
                                key={attraction.location_id}
                                boxShadow="lg"
                                rounded="md"
                                overflow="hidden"
                                >
                                <Image
                                    src={attraction.photoUrl}
                                    h="250px"
                                    objectFit="cover"
                                    alt={attraction.name}
                                />
                                <VStack p="4" alignItems="start" spacing={2}>
                                    <Heading size="md">{attraction.name}</Heading>
                                </VStack>
                                </Box>
                            ))}
                            </SimpleGrid>
                        )}
                        </Box>
                        </Box>
                        <Box>
                            <Heading as="h3" size="lg" mb={4}>
                                Packing List
                            </Heading>
                        </Box>
                </VStack>
            </Box>
        </ChakraProvider>
  );
};



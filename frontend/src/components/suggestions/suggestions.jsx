import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
  VStack,
  Image,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { Footer } from '../footer/footer';
import dashBackground from '../../dashbkg.jpg';
import './suggestions.css';
import axios from 'axios';

const Attractions = () => {
  const [destinationDisplayCode, setDestinationDisplayCode] = useState('');
  const [attractions, setAttractions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can add any logic you want here when the form is submitted.

    try {
        const attractionsResponse = await axios.get(`/search?location=${destinationDisplayCode}`);
      if (attractionsResponse.data) {
        setAttractions(attractionsResponse.data.attractions);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                Suggested Attractions
              </Heading>
              <form onSubmit={handleSubmit}>
                <Stack
                  spacing={4}
                  direction={{ base: 'column', md: 'row' }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <input
                    placeholder="Enter your destination"
                    value={destinationDisplayCode}
                    onChange={(e) =>
                      setDestinationDisplayCode(e.target.value)
                    }
                    required
                  />
                  <Button type="submit" colorScheme="teal" size="lg">
                    Search
                  </Button>
                </Stack>
              </form>
            </Flex>
            <Box mt={6}>
              <Heading as="h3" size="lg" mb={4}>
                Suggested Attractions
              </Heading>
              {attractions.length === 0 ? (
                <Text>No attractions found</Text>
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
          <Footer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Attractions;

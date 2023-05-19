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
  Container,
  Divider,
} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import dashBackground from '../../dashbkg.jpg';
import './suggestions.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import navlogo from '../../navlogo.png';

export const Suggestions = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [cityName, setCityName] = useState('');
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      navigate('/login');
    }
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [navigate]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const suggResponse = await axios.post('http://localhost:4000/suggestions', {
          user
        });
        console.log('Suggestions Response: ', suggResponse);
        setAttractions(suggResponse.data.attractions);
        console.log('Sugg Response data', suggResponse.data.attractions)
        setCityName(suggResponse.data.cityName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttractions();
  }, [user]);

  return (
    <ChakraProvider>
      <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh" px={4}>
        <Flex direction="column" align="center" justify="center">
          <Box bg="transparent" color="white" py="8" px="12" borderRadius="xl" textAlign="center">
            <Flex justify="center">
              <Image src={navlogo} alt="Planetpass Logo" boxSize="150px" objectFit="contain" />
            </Flex>
            <Heading as="h1" size="2xl" mb="4">
              Some places you might like.
            </Heading>
            <Text fontSize="xl" mb="4">
              Explore the world with ease.
            </Text>
          </Box>
        </Flex>
        <Divider />
        <VStack spacing={8} alignItems="center" py={8}>
          <Heading as="h3" size="lg" mb={4} textAlign="center" color="white">
            Attractions in {cityName}
          </Heading>
          {attractions.length === 0 ? (
            <Text color="white">Please save a flight first and wait a couple seconds.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {attractions.map((attraction) => (
                <Box
                  key={attraction.location_id}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="lg"
                  overflow="hidden"
                >
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Image
                      src={attraction.photoUrl}
                      h="250px"
                      objectFit="cover"
                      alt={attraction.name}
                    />
                  </Box>
                  <VStack p="4" alignItems="start" spacing={2}>
                    <Heading size="md">{attraction.name}</Heading>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
        <VStack spacing={8} alignItems="center" mt={8}>
          <Heading as="h3" size="lg" mb={4} color="white">
            Packing List
          </Heading>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

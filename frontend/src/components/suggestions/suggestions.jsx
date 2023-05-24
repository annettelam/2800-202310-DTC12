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
import { useNavigate } from 'react-router-dom';

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
        const suggResponse = await axios.post('https://planetpass-backend.onrender.com/suggestions', {
          user
        });
        // console.log('Suggestions Response: ', suggResponse);
        setAttractions(suggResponse.data.attractions);
        // console.log('Sugg Response data', suggResponse.data.attractions)
        setCityName(suggResponse.data.cityName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttractions();
  }, [user]);

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
                Some places you might like
              </Heading>
            </Flex>
            <Box mt={6}>
              <Heading as="h3" size="lg" mb={4} textAlign="center">
                Attractions in {cityName}
              </Heading>
              {attractions.length === 0 ? (
                <Text>Please save a flight first and wait a couple seconds.</Text>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                  {attractions.map((attraction) => (
                    <Box
                      key={attraction.location_id}
                      boxShadow="lg"
                      rounded="md"
                      overflow="hidden"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
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
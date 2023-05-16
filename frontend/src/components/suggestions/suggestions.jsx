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

const Attractions = ({ location, attractions }) => {
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
            {attractions.length === 0 ? (
              <Text>No attractions found near {location}</Text>
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
          <Footer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Attractions;

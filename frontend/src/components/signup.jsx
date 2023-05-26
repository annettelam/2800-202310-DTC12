import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ChakraProvider, 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Container, 
  Flex, 
  Image } from '@chakra-ui/react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import navlogo from '../navlogo.png';

export const SignUp = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  function customTrim(value) {
    return value.trim().replace(/\s+/g, ' ');
  }  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedCity = customTrim(city);

    try {
      const response = await axios.post('https://planetpass-backend.onrender.com/signup', {
        email: trimmedEmail,
        username: trimmedUsername,
        password: trimmedPassword,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        city: trimmedCity,
      });

      const { data } = response;

      if (data) {
        if (data.message === 'Success') {
          // If sign up is successful, call the onLogin function and navigate to the profile page
          onLogin(JSON.stringify(data.user));
          navigate('/profile');
        } else {
          // Set the error message if sign up is unsuccessful
          setMsg(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <ChakraProvider>
        <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh">
          <Container maxWidth="container.xl">
            <Flex direction="column" align="center" justify="center" minHeight="50vh">
              <Box bg="aliceblue.500" color="white" py="8" px="12" borderRadius="xl" textAlign="center">
                <Flex justify="center">
                  <Image src={navlogo} alt="Planetpass Logo" boxSize="300px" objectFit="contain" />
                </Flex>
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      {/* Input field for entering the first name */}
                      <Input
                          type="text"
                          name="firstName"
                          placeholder="Enter first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          bg="white"
                          color="black"
                      />
                  </FormControl>
                  <br />
                  <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      {/* Input field for entering the last name */}
                      <Input
                          type="text"
                          name="lastName"
                          placeholder="Enter last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          bg="white"
                          color="black"
                      />
                  </FormControl>
                  <br />
                  <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    {/* Input field for entering the email */}
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="white"
                      color="black"
                    />
                  </FormControl>
                  <br />
                  <FormControl isRequired>
                      <FormLabel>Username</FormLabel>
                      {/* Input field for entering the username */}
                      <Input
                          type="text"
                          name="username"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          bg="white"
                          color="black"
                      />
                  </FormControl>
                  <br />
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    {/* Input field for entering the password */}
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="white"
                      color="black"
                    />
                  </FormControl>
                  <br />
                  <FormLabel>City</FormLabel>
                    {/* Input field for entering the city */}
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      bg="white"
                      color="black"
                    />
                  <br />
                  <br />
                  <Button colorScheme="teal" variant="solid" type="submit" style={{ width: '100%' }}>
                    Sign Up
                  </Button>
                </form>
                {/* Display the error message if it exists */}
                {msg && (
                  <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                    {msg}
                  </p>
                )}
              </Box>
            </Flex>
          </Container>
        </Box>
      </ChakraProvider>
  );
};

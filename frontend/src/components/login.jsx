import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  FormHelperText, 
  Button, 
  Container, 
  Flex, 
  Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import navlogo from '../navlogo.png';

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(email, password);

    try {
      await axios.post('https://planetpass-backend.onrender.com/login', {
            email, password
        }).then((res) => {
            console.log(res.data);
            if (res.data) {
              if (res.data.message === 'Success') {
                // If login is successful, call the onLogin function and navigate to the profile page
                onLogin(JSON.stringify(res.data.user));
                navigate('/profile');
              } else {
                // Set the error message if login is unsuccessful
                setMsg(res.data);
              }
            }
        })
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
                      <FormHelperText>We'll never share your email.</FormHelperText>
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
                    <Button id="submitBtn" colorScheme="teal" variant="solid" type="submit" style={{ width: '100%' }}>
                      Log In
                    </Button>
                  </form>
                  {msg && (
                    // Display the error message if it exists
                    <p id="errorMsg" className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                      {msg}
                    </p>
                  )}
                  <div style={{ marginTop: '10px' }}>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </div>
                </Box>
              </Flex>
            </Container>
          </Box>
        </ChakraProvider>
    );
};


import React, { useState } from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, FormHelperText, Button, Container, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
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
        e.preventDefault(); // prevents page from reloading
        console.log(email, password);

        try {
            await axios.post('http://localhost:4000/login', {
                email, password
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    if (res.data.message === 'Success') {
                        onLogin(JSON.stringify(res.data.user));
                        navigate('/profile');
                    } else {
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
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        bg="white"
                        color="black"
                      />
                    </FormControl>
                    <br />
                    <Button colorScheme="teal" variant="solid" type="submit" style={{ width: '100%' }}>
                      Submit
                    </Button>
                  </form>
                  {msg && (
                    <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
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

{/* <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <br />
                                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                            Submit
                                        </Button>
                                        {msg && (
                                            <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                                                {msg}
                                            </p>
                                        )}
                                        <div style={{ marginTop: '10px' }}>
                                            <Link to="/forgotpassword">Forgot Password?</Link>
                                        </div>
                                    </Form>
                                </div> */}

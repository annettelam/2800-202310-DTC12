import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import navlogo from '../navlogo.png';
import { ChakraProvider, Box, Image, Flex } from '@chakra-ui/react';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://planetpass-backend.onrender.com/reset-password', { email });
            setEmailSent(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ChakraProvider>
            <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh">
                <div className="text-center">
                    <Flex justify="center">
                        <Image src={navlogo} alt="Planetpass Logo" boxSize="250px" objectFit="contain" />
                    </Flex>
                    <Alert variant="primary">
                        <Alert.Heading>Change / Forgot Password</Alert.Heading>
                        <hr />
                        <p className="mb-0">
                            Please enter your email address below.
                            We will send you an email with instructions on how to reset your password.
                        </p>
                    </Alert>
                    {emailSent && <div className="alert alert-success">Email sent successfully! Please check your email.</div>}
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px' }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                Reset Password
                            </Button>
                        </Form>
                    </div>
                </div>
            </Box>
        </ChakraProvider>
    );
};

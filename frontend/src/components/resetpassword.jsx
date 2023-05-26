import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  ChakraProvider, 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Container, 
  Flex, 
  Image, 
  useToast } from '@chakra-ui/react';
import navlogo from '../navlogo.png';

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(`http://localhost:4000/reset-password/${token}`, { password });
      toast({
        title: 'Password reset successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setError('Failed to reset password');
      toast({
        title: 'Failed to reset password',
        status: 'error',
        isClosable: true,
      });
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
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <br />
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    bg="white"
                    color="black"
                  />
                </FormControl>
                {error && <Box color="red">{error}</Box>}
                <br />
                <Button colorScheme="teal" variant="solid" type="submit" style={{ width: '100%' }}>
                  Reset Password
                </Button>
              </form>
            </Box>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

import React, { useState } from 'react';
import axios from 'axios';
import navlogo from '../navlogo.png';
import { 
  ChakraProvider, 
  Box, 
  Stack, 
  AlertIcon, 
  FormControl, 
  FormLabel, 
  Input, 
  FormHelperText, 
  Button, 
  Container, 
  Flex, 
  Image, 
  Alert, 
  useToast, 
  Wrap, 
  WrapItem } from '@chakra-ui/react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Email is required',
        status: 'warning',
        isClosable: true,
      });
      return;
    }
    try {
      // Send a POST request to the server to reset the password
      await axios.post('https://planetpass-backend.onrender.com/reset-password', { email });
      setEmailSent(true);
      // Show a success toast if the email was sent successfully
      toast({
        title: 'Email sent successfully!',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setEmailSent(false);
      // Show an error toast if the email was not found
      toast({
        title: 'Email not found. Please make sure you entered the correct email address.',
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
            <Box textAlign="center" mt="4">
              <Flex justify="center">
                <Image src={navlogo} alt="Planetpass Logo" boxSize="250px" objectFit="contain" />
              </Flex>
              <Stack spacing={3}>
                <Alert status="info">
                  <AlertIcon />
                  To reset your password, please enter your email address below. We will send an email with instructions on further action.
                </Alert>
              </Stack>
              <br />
              <Box maxWidth="400px" margin="0 auto">
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
                    <FormHelperText>Please wait a couple minutes to receive your email.</FormHelperText>
                  </FormControl>
                  <br />
                  <Wrap justify="center">
                    <WrapItem>
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        type="submit"
                        width="100%"
                        mt="4"
                        disabled={emailSent}
                      >
                        {emailSent ? 'Email Sent' : 'Reset Password'}
                      </Button>
                    </WrapItem>
                  </Wrap>
                </form>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

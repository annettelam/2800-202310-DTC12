import React, { useState } from 'react';
import axios from 'axios';
import navlogo from '../navlogo.png';
import { ChakraProvider, Box, Stack, AlertIcon, FormControl, FormLabel, Input, FormHelperText, Button, Container, Flex, Image, Alert, useToast, Wrap, WrapItem } from '@chakra-ui/react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const toast = useToast();
  const statuses = ['success'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/reset-password', { email });
      setEmailSent(true);
      toast({
        title: 'Email sent successfully!',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChakraProvider>
      <Box bgGradient="linear(to bottom right, aliceblue, teal)" fontFamily="Questrial" minHeight="100vh">
        <Container maxWidth="container.xl">
          <Flex direction="column" align="center" justify="center" minHeight="100vh">
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
                    {statuses.map((status, i) => (
                      <WrapItem key={i}>
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          type="submit"
                          width="100%"
                          mt="4"
                          onClick={() => setEmailSent(true)}
                          disabled={emailSent}
                        >
                          {emailSent ? 'Email Sent' : 'Reset Password'}
                        </Button>
                      </WrapItem>
                    ))}
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

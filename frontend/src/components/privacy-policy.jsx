import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Container } from "react-bootstrap";

export const PrivacyPolicy = () => {
  return (
    <Container>
      <Box mt={8} mb={50}>
        <Heading as="h1" size="xl" mb={4}>
          Privacy Policy
        </Heading>
        <br />
        <Text mb={4}>
          This Privacy Policy describes how we collect, use, and handle your
          personal information when you use our website/app.
        </Text>
        <br />
        <Heading as="h2" size="lg" mb={2}>
          Information We Collect
        </Heading>
        <br />
        <Text mb={4}>
          - We may collect personal information such as your name, email
          address, and contact details when you voluntarily provide them to us.
        </Text>
        <br />
        <Heading as="h2" size="lg" mb={2}>
          How We Use Your Information
        </Heading>
        <br />
        <Text mb={4}>
          - We use the information we collect to communicate with you, provide
          services, and improve your experience with our website/app. - We may
          use your email address to send you important updates and marketing
          communications, which you can opt out of at any time. - We do not
          sell, rent, or lease your personal information to third parties unless
          required by law or with your consent.
        </Text>
      </Box>
    </Container>
  );
}

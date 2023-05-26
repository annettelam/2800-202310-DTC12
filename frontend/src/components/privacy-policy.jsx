import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Container } from "react-bootstrap";

export const PrivacyPolicy = () => {
  return (
    <Container>
      <Box mt={8} mb={50}>
      <Heading as="h1" fontSize="2xl" mb={4}>
        Privacy Policy
      </Heading>

      <Text>Last updated: May 25, 2023 19:10</Text>

      <Text mt={4}>
        At PlanetPass, we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our mobile application (PlanetPass). By using PlanetPass, you consent to the collection and use of your personal information as described in this Privacy Policy.
      </Text>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        1. Information We Collect
      </Heading>

      <Text>
        We may collect the following types of personal information:
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        1.1. Account Information:
      </Heading>
      
      <Text marginLeft={20}>
        When you create an account on PlanetPass, we may collect your name, email address, username, and password.
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        1.2. Usage Information:
      </Heading>

      <Text marginLeft={20}>
        We may collect information about your interactions with the App, such as your device information, IP address, device ID, app usage data, and crash reports.
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        1.3. Communication:
      </Heading>

      <Text marginLeft={20}>
        If you contact us for support or other inquiries, we may collect and store any information you provide in your communications with us.
      </Text>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        2. Use of Information
      </Heading>

      <Text>
        We use the collected information for the following purposes:
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        2.1. Account Management:
      </Heading>

      <Text marginLeft={20}>
        We use your account information to create and manage your account, authenticate your access, and provide personalized features.
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        2.2. App Functionality:
      </Heading>

      <Text marginLeft={20}>
        We may use your information to operate, maintain, and improve the functionality of the App, including troubleshooting, data analysis, and research.
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        2.3. Communication:
      </Heading>

      <Text marginLeft={20}>
        We may use your contact information to send you important updates, notifications, password reset emails, and other relevant information related to your account or the App.
      </Text>

      <Heading as="h3" fontSize="lg" mt={4} mb={2} marginLeft={20}>
        2.4. User Support:
      </Heading>

      <Text marginLeft={20}>
        If you contact us for support, we may use your information to assist you and address your inquiries.
      </Text>
      </Box>
    </Container>
  );
};


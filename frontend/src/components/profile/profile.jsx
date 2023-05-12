import React from 'react';
import {
    ChakraProvider, Box, Heading, Text, Card, CardHeader,
    CardBody, Stack, StackDivider, Image, CardFooter,
    Button, Tabs, TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import { Footer } from '../footer/footer';

export const Dashboard = (props) => {
    return (
        <ChakraProvider>
            <div
                style={{
                    background: 'linear-gradient(to bottom right, aliceblue, teal)',
                    fontFamily: 'Questrial',
                    minHeight: '100vh',
                }}
            >
                <Card align='center'>
                    <CardHeader>
                        <Heading size='md'>Welcome,</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Summary
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    View a summary of all your clients over the last month.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Overview
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Check out the overview of your clients.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
                <Card align='center'>
                    <CardHeader>
                        <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>View here</Button>
                    </CardFooter>
                </Card>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>Tab 1</Tab>
                        <Tab>Tab 2</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <Footer />
        </ChakraProvider>
    );
};

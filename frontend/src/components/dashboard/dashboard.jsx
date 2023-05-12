import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/dashboard');
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#flights">Find Flights</Nav.Link>
              <Nav.Link href="#hotels">Find Hotels</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <h1>Welcome to your Dashboard</h1>
        {userData && (
          <div>
            <h3>Email: {userData.email}</h3>
            <h3>Username: {userData.username}</h3>
            <h3>Origin City: {userData.originCity}</h3>
            <h3>Saved Flights:</h3>
            {/* <ul>
              {userData.savedFlights.map((flight, index) => (
                <li key={index}>{flight}</li>
              ))}
            </ul> */}
            <h3>Saved Hotels:</h3>
            {/* <ul>
              {userData.savedHotels.map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">© 2023 PlanetPass. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import alicelogo from './alicelogo.png';
import navlogo from './navlogo.png';

const Planetpass = () => {
  return (
    <div style={{ backgroundColor: '#E6F7FF' }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home"><img src={navlogo} alt="logo" className="App-logo" style={{ width: '75px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#flights">Find Flights</Nav.Link>
              <Nav.Link href="#hotels">Find Hotels</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success" className="me-2">Sign Up</Button>
              <Button variant="outline-success" className="me-2">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="text-center my-5">
        <img src={alicelogo} alt="logo" className="App-logo" style={{ width: '300px' }} />

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          © 2023 PlanetPass. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Planetpass;

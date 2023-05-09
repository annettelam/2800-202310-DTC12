import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Planetpass = () => {
  return (
    <div>
      <Navbar bg="" expand="lg">
        <Container>

          <Navbar.Brand href="#home">PlanetPass</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success" className="me-2">Sign Up</Button>
              <Button variant="outline-success" className="me-2">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="text-center my-5">
        <h1>Welcome to PlanetPass!</h1>
        <p>Please sign up or login to access the site.</p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
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

import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import alicelogo from '../alicelogo.png';
import navlogo from '../navlogo.png';

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents page from reloading
        console.log(email, name, password);
    };

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
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

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    <button onClick={() => props.onFormSwitch('login')} className='btn btn-link d-inline-block float-end'>Already have an account? Login here.</button>
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
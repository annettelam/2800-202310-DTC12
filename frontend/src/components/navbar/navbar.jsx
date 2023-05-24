import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../fonts.css';
import navlogo from '../../navlogo.png';

export const CustomNavbar = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log('Logging out');
        try {
            // Destroy session on server
            await axios.post('https://planetpass-backend.onrender.com/logout');

            // Remove items from localStorage
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');

            // Update loggedIn state
            setLoggedIn(false);

            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Navbar bg="light" expand="lg" className="mb-0">
            <Container>
                <Navbar.Brand href="#home"><img src={navlogo} alt="logo" className="App-logo" style={{ width: '75px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
                    <FaBars />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/flights">Find Flights</Nav.Link>
                        <Nav.Link href="/hotels">Find Hotels</Nav.Link>
                    </Nav>
                    <Form className="d-flex align-items-center">
                        {loggedIn ? (
                            <>
                                <Button variant="outline-secondary" as={Link} to='/profile' className="me-2">Profile</Button>
                                <Button variant="danger" onClick={handleLogout} className="me-2">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-success" as={Link} to='/signup' className="me-2">Sign Up</Button>
                                <Button variant="outline-success" as={Link} to='/login' className="me-2">Login</Button>
                            </>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

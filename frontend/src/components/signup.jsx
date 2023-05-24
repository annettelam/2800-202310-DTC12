import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import alicelogo from '../alicelogo.png';

export const SignUp = ({ onLogin }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents page from reloading
        console.log(email, username, password, firstName, lastName, city);

        try {
            const response = await axios.post('https://planetpass-backend.onrender.com/signup', {
                email,
                username,
                password,
                firstName,
                lastName,
                city,
            });

            const { data } = response;

            console.log(data);
            if (data) {
                if (data.message === 'Success') {
                    onLogin(JSON.stringify(data.user));
                    navigate('/profile');
                } else {
                    setMsg(data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header>
                {/* Your navbar code here */}
            </header>

            <main style={{ flex: '1' }}>
                <div className="text-center my-5">
                    <img src={alicelogo} alt="logo" className="App-logo" style={{ width: '300px' }} />
                    <Form className="text-center my-5" onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" style={{ width: '100%' }}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Row>
                            <Col md={6} className="mb-3 mb-md-0"> {/* Add margin bottom for non-responsive view */}
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br></br>
                        <Form.Group controlId="formBasicUsername" style={{ width: '100%' }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicCity" style={{ width: '100%' }}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword" style={{ width: '100%' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                        {msg && (
                            <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                                {msg}
                            </p>
                        )}
                    </Form>
                </div>
            </main>
        </div>
    );
};

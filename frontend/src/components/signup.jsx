import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import alicelogo from '../alicelogo.png';
import { Footer } from './footer/footer';

export const SignUp = ({onLogin}) => {
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
            await axios.post('http://localhost:4000/signup', {
                email, username, password, firstName, lastName, city
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    if (res.data.message === 'Success') {
                        onLogin(JSON.stringify(res.data.user));
                        navigate('/flights');
                    } else {
                        setMsg(res.data);
                    }
                } 
            })
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial' }}>
            <div className="text-center my-5">
                <img src={alicelogo} alt="logo" className="App-logo" style={{ width: '300px' }} />

                <Form className='text-center my-5' onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" style={{ width: '100%' }}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <div className="d-flex">
                        <Form.Group controlId="formBasicFirstName" style={{ width: '48%' }}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" name="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='ms-auto' controlId="formBasicLastName" style={{ width: '48%' }}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" name="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formBasicUsername" style={{ width: '100%' }}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicCity" style={{ width: '100%' }}>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="city" name="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword" style={{ width: '100%' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                    {msg &&
                        <p className='text-danger fw-bold' style={{ textAlign: 'left' }}> {msg} </p>
                    }
                </Form>
            </div>
            <Footer />
        </div>
    );
};
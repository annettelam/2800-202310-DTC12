import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import alicelogo from '../alicelogo.png';

export const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents page from reloading
        console.log(email, password);

        try {
            await axios.post('https://planetpass-backend.onrender.com/login', {
                email, password
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    if (res.data.message === 'Success') {
                        onLogin(JSON.stringify(res.data.user));
                        navigate('/profile');
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
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial', minHeight: '100vh' }}>
            <div className="text-center">
                <img src={alicelogo} alt="logo" className="App-logo" style={{ width: '300px', marginTop: '50px' }} />

                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                        {msg && (
                            <p className="text-danger fw-bold" style={{ textAlign: 'left' }}>
                                {msg}
                            </p>
                        )}
                        <div style={{ marginTop: '10px' }}>
                            <Link to="/forgotpassword">Forgot Password?</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};


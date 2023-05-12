import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../fonts.css';
import alicelogo from '../alicelogo.png';
import { Footer } from './footer/footer';

export const Login = ({onLogin}) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents page from reloading
        console.log(email, password);

        try {
            await axios.post('http://localhost:4000/login', {
                email, password
            }).then((res) => {
                console.log(res.data);
                if (res.data) {
                    if (res.data === 'Success') {
                        onLogin();
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

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                    {msg &&
                        <p className='text-danger fw-bold' style={{ textAlign: 'left' }}> {msg} </p>
                    }
                    <div style={{ marginTop: '10px' }}>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    );
};
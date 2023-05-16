import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import alicelogo from '../alicelogo.png';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/reset-password', { email });
            setEmailSent(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ backgroundColor: '#E6F7FF', fontFamily: 'Questrial', minHeight: '100vh' }}>
            <div className="text-center">
                <img src={alicelogo} alt="logo" className="App-logo" style={{ width: '200px', marginTop: '30px', marginBottom: '30px' }} />                <Alert variant="primary">
                    <Alert.Heading>Forgot Password</Alert.Heading>
                    <hr />
                    <p className="mb-0">
                        Please enter your email address below.
                        We will send you an email with instructions on how to reset your password.
                    </p>
                </Alert>
                {emailSent && <div className="alert alert-success">Email sent successfully! Please check your email.</div>}
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                            Reset Password
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );

};

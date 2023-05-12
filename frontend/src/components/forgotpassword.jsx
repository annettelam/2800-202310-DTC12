import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

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
        <div>
            <h2>Forgot Password</h2>
            {emailSent && <div className="alert alert-success">Email sent successfully! Please check your email. </div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Reset Password</Button>
            </Form>
        </div>
    );
};

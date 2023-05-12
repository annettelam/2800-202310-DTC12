import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/reset-password', { email });
      // Redirect user to confirmation page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
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

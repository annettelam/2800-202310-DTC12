import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(`http://localhost:4000/reset-password/${token}`, { password });
      setSuccess(true);
      toast({
        title: 'Password reset successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      setError('Failed to reset password');
      toast({
        title: 'Failed to reset password',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success ? (
        <div className="alert alert-success">Password reset successfully</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>
      )}
    </div>
  );
};

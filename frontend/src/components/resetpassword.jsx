import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        console.log("1");
        e.preventDefault();
        console.log("2");
        if (password !== confirmPassword) {
            console.log("passwords don't match")
            setError('Passwords do not match');
            return;
        }
        try {

            await axios.post(`https://planetpass-backend.onrender.com/reset-password/${token}`, { password });
            setSuccess(true);
        } catch (err) {
            setError('Failed to reset password');
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
                        <Form.Control type="password" name="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Reset Password</Button>
                </Form>
            )}
        </div>
    );
};

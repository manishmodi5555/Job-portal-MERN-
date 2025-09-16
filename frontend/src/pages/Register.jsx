
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../utils/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
         setLoading(true); setMessage(null); setError(null);
    try {
              await api.post(`${API_BASE_URL}/auth/register`, form);
         setMessage('Registered successfully. You can now log in.');
           setForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login after registration
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Body>
              <Card.Title className='text-center'>Create Account</Card.Title>
        {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={onChange} required />
                </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
          </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={onChange} minLength={6} required />
          </Form.Group>
          <Button className='form-control' type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

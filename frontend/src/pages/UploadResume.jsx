
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../utils/api';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); setError(null);
    if (!file) return setError('Please select a file');
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    try {
      const { data } = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Uploaded! Saved at: ${data.resumePath}`);
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 520 }}>
      <Card.Body>
        <Card.Title>Upload Resume</Card.Title>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Choose PDF/DOC/DOCX (max 2MB)</Form.Label>
            <Form.Control type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>
          <Button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

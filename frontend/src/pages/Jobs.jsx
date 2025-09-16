
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge, Alert, Modal } from 'react-bootstrap';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
const API_BASE_URL = import.meta.env.VITE_API_URL;


export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { token } = useAuth();
  const [show, setShow] = useState(false);
   const [apps, setApps] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`${API_BASE_URL}/jobs`);
        setJobs(data);

        // if(token){
        //   const apply = await api.get('/applications');
        //   setApps(apply);
        // }

      } catch (err) {
        setError('Failed to load jobs');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const { data } = await api.get(`${API_BASE_URL}/applications`);
          setApps(data);
          // console.log("thiiiiiiissss", data);
        }
      } catch (err) {
        setError('Failed to load applications');
      }
    })();
  }, []);
  
  const apply = async (jobId) => {
    setMessage(null); setError(null);
    try {
      await api.post(`${API_BASE_URL}/jobs/apply/${jobId}`);
      setMessage('Applied successfully!');
      setShow(true);
      

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply');
    }
  };

  return (
    <>
    <div>
      <h3 className="mb-3">Open Jobs</h3>
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row xs={1} md={2} lg={3} className="g-3">
        {jobs.map(job => (
          <Col key={job._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.company} • <Badge bg="secondary">{job.location}</Badge>
                </Card.Subtitle>
                <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{job.description}</Card.Text>
                <div className="mb-2">
                  {job.requirements?.map((r, idx) => (
                    <Badge key={idx} bg="info" className="me-1">{r}</Badge>
                  ))}
                </div>


                {token ? (
                  apps.some(a => a.job?.company === job.company) ? (
                    <Button variant="success" disabled>Applied</Button>
                  ) : (
                    <Button onClick={() => apply(job._id)}>Apply</Button>
                )
              ) : (
                <h6 className="text-muted-danger ">Login to apply</h6>
              )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>


     {message&&   <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Applied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You have successfully applied for this job.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => { setShow(false); window.location.reload(); }}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>}

    </>
  );
}

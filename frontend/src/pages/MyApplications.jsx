
import React, { useEffect, useState } from 'react';
import { Table, Alert, Badge } from 'react-bootstrap';
import api from '../utils/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;


export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState(null);

      useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`${API_BASE_URL}/applications`);
        setApps(data);
          } catch (err) {
        setError('Failed to load applications');
      }
    })();
  }, []);

  

  return (
    <div>
      <h3 className="mb-3">My Applications</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>NO.</th>
            <th>Job</th>
            <th>Company</th>
                <th>Location</th>
            <th>Status</th>
            <th>Applied</th>
          </tr>
        </thead>
        <tbody>
             {apps.map((a, idx) => (
            <tr key={a._id}>
                <td>{idx + 1}</td>
               <td>{a.job?.title}</td>
              <td>{a.job?.company}</td>
              <td>{a.job?.location}</td>
               <td><Badge bg="secondary">{a.status}</Badge></td>
              <td>{new Date(a.appliedAt).toLocaleString()}</td>
            </tr>
          ))}
          {apps.length === 0 && (
               <tr>
              <td colSpan="6" className="text-center text-muted">No applications yet</td>
             </tr>
          )}
        </tbody>
         </Table>
    </div>
  );
}

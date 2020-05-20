import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import api from '../api';

const WinnerStatusVerification = () => {
  const [status, setStatus] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.fetchWinnerStatus(e.target.elements.username.value);
    setStatus(res);
  };

  return (
    <Row>
      <Col md="4">
        <Card>
          <Card.Header>Winner Status Verification Form</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">Your username</Form.Label>
                <Form.Control id="username" />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
            {status && <Alert variant="info">{status}</Alert>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default WinnerStatusVerification;

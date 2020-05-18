import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthForm = ({ onSuccess, endpoint, title }) => {
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    const {
      login: { value: login },
      password: { value: password }
    } = e.target.elements;
    setFormValues({ login, password });
  };

  useEffect(() => {
    if (!formValues) {
      return;
    }
    axios({
      method: 'POST',
      url: `http://localhost:3000/${endpoint}`,
      data: formValues
    }).then(
      ({ data: { user } }) => {
        window.localStorage.setItem('user_token', user.token);
        onSuccess(user);
        history.push('/');
      },
      err => setError(err)
    );
  }, [endpoint, formValues, onSuccess]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <br />
          <h1>{title}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLogin">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter login"
                name="login"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
          <p>
            <Link to="/">Home</Link>
          </p>
        </Col>
      </Row>
      <Row>
        {error && <Alert variant="danger">Error! Please try again.</Alert>}
      </Row>
    </Container>
  );
};

AuthForm.propTypes = {
  endpoint: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default AuthForm;

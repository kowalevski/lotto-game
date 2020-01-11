import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AuthForm = ({ endpoint }) => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Login</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {endpoint}
      </Button>
    </Form>
  );
};

AuthForm.propTypes = {
  endpoint: PropTypes.string.isRequired
};

export default AuthForm;

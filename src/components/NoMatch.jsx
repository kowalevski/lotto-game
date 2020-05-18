import React from 'react';
import { Alert } from 'react-bootstrap';

export default function NoMatch() {
  return (
    <Alert variant="dark">
      404 Page Not Found{' '}
      <span role="img" aria-label="404">
        😕
      </span>
    </Alert>
  );
}

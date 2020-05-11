import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '../api';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
    api.reportError(error, info);
  }

  tryAgain = () =>
    this.setState({
      hasError: false
    });

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <>
        <Alert variant="danger">
          <p>Something was wrong</p>
          <Button variant="secondary" onClick={this.tryAgain}>
            Try Again?
          </Button>
        </Alert>
      </>
    ) : (
      children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

ErrorBoundary.defaultProps = {
  children: null
};

export default ErrorBoundary;

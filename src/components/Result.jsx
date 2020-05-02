import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Result = ({ isResultShown, onFinishGame, username }) => {
  return (
    <Modal show={isResultShown}>
      <Modal.Header>
        <Modal.Title>Your Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Guessed Numbers</th>
              <th>Wrong Numbers</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{username || '-'}</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onFinishGame}>
          Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Result.propTypes = {
  isResultShown: PropTypes.bool.isRequired,
  onFinishGame: PropTypes.func.isRequired,
  username: PropTypes.string
};

Result.defaultProps = {
  username: null
};

export default Result;

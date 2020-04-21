import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Result = ({ isResultShown, onHideResult }) => {
  return (
    <Modal show={isResultShown}>
      <Modal.Header>
        <Modal.Title>Your Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHideResult}>
          Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Result.propTypes = {
  isResultShown: PropTypes.bool.isRequired,
  onHideResult: PropTypes.func.isRequired
};

export default Result;

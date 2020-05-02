import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import utils from '../utils';

const Result = ({
  isResultShown,
  onFinishGame,
  username,
  guessedNumbers,
  wrongNumbers,
  missedNumbers,
  isPlayerWinner
}) => {
  return (
    <Modal show={isResultShown} size="lg">
      <Modal.Header>
        <Modal.Title>
          Your Result{' '}
          <span role="img" aria-label="result">
            📌
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                Username{' '}
                <span role="img" aria-label="username">
                  🎩
                </span>
              </th>
              <th>
                Guessed Numbers{' '}
                <span role="img" aria-label="guessed">
                  ✅
                </span>
              </th>
              <th>
                Wrong Numbers{' '}
                <span role="img" aria-label="wrong">
                  🚫
                </span>
              </th>
              <th>
                Missed Numbers{' '}
                <span role="img" aria-label="missed">
                  ❓
                </span>
              </th>
              <th>
                Result{' '}
                <span role="img" aria-label="result">
                  📝
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{username || '-'}</td>
              <td>{guessedNumbers.map(utils.getFormattedNumberItem)}</td>
              <td>{wrongNumbers.map(utils.getFormattedNumberItem)}</td>
              <td>{missedNumbers.map(utils.getFormattedNumberItem)}</td>
              <td>{isPlayerWinner ? 'You win 👍' : 'You lose 👎'}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onFinishGame}>
          <span>Home </span>
          <span role="img" aria-label="home">
            🏠
          </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Result.propTypes = {
  isResultShown: PropTypes.bool.isRequired,
  onFinishGame: PropTypes.func.isRequired,
  username: PropTypes.string,
  guessedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  wrongNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  missedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  isPlayerWinner: PropTypes.bool.isRequired
};

Result.defaultProps = {
  username: null
};

export default Result;

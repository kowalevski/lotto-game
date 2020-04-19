import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BingoNumber from './BingoNumber';

const BingoNumbers = ({ numbers }) => {
  return (
    <Card>
      <Card.Header>Bingo Numbers</Card.Header>
      <Card.Body>
        {numbers.map(n => (
          <BingoNumber number={n} />
        ))}
      </Card.Body>
    </Card>
  );
};

BingoNumbers.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default BingoNumbers;

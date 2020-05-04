import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Chip from './Chip';

const Chips = ({ chips, onDrag }) => {
  return (
    <Card>
      <Card.Header>Your Chips</Card.Header>
      <Card.Body>
        {Object.values(chips).map(({ id, isDragged, isDropped }) => (
          <Chip
            key={id}
            id={id}
            isDragged={isDragged}
            isDropped={isDropped}
            onDrag={onDrag}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

Chips.propTypes = {
  chips: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isDragged: PropTypes.bool.isRequired,
      isDropped: PropTypes.bool.isRequired
    })
  }).isRequired,
  onDrag: PropTypes.func.isRequired
};

export default Chips;

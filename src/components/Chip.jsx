import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledChip = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 5px;
  display: inline-block;
  cursor: pointer;

  ${({ isDragged }) =>
    isDragged &&
    `
    opacity: 0.7;
  `}

  ${({ isInSquare }) =>
    isInSquare &&
    `
        position: absolute;
        left: 2px;
        top: 2px;

        &:hover {
          opacity: 0.5;
        }
  `}
`;

const Chip = ({ onDrag, id, isDragged, isDropped, isInSquare }) => {
  if (isDropped) {
    return null;
  }

  return (
    <StyledChip
      src="./chip.png"
      alt="chip"
      onClick={() => onDrag && onDrag(id)}
      isDragged={isDragged}
      isInSquare={isInSquare}
    />
  );
};

Chip.propTypes = {
  onDrag: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isDragged: PropTypes.bool.isRequired,
  isDropped: PropTypes.bool.isRequired,
  isInSquare: PropTypes.bool
};

Chip.defaultProps = {
  isInSquare: false
};

export default Chip;

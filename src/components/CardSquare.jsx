import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border-radius: 0;

  &:hover {
    background-color: #17a2b8 !important;
    color: white;
  }
`;

const BingoNumber = styled.button`
  width: 4em;
  height: 4em;
  text-align: center;
  background: none;
  border: none;
  outline: none !important;
  color: inherit;

  &:disabled {
    cursor: not-allowed;
  }
`;

const BingoNumberText = styled.h3`
  margin: 0;
  line-height: 2.3em;
`;

const CardSquare = ({ bingoNumber, isChecked, onCover }) => {
  return (
    <StyledCard
      bg={isChecked ? 'info' : 'light'}
      text={isChecked ? 'white' : 'black'}
    >
      <BingoNumber
        className="bingo-number"
        disabled={!bingoNumber}
        onClick={() => onCover()}
      >
        {bingoNumber && <BingoNumberText>{bingoNumber}</BingoNumberText>}
      </BingoNumber>
    </StyledCard>
  );
};

CardSquare.propTypes = {
  bingoNumber: PropTypes.number,
  isChecked: PropTypes.bool,
  onCover: PropTypes.func.isRequired
};

CardSquare.defaultProps = {
  bingoNumber: null,
  isChecked: false
};

export default CardSquare;

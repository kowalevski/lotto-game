import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { ThemeContext } from '../ThemeSwitcher';
import Chip from './Chip';

const StyledCard = styled(Card)`
  border-radius: 0;
`;

const BingoNumber = styled.button`
  width: 4em;
  height: 4em;
  text-align: center;
  background: none;
  border: none;
  outline: none !important;
  color: inherit;
  position: relative;
  cursor: inherit !important;

  &:disabled {
    cursor: not-allowed;
  }
`;

const BingoNumberText = styled.h3`
  margin: 0;
  line-height: 2.3em;
`;

const CardSquare = ({ cell, onClick }) => {
  const { theme, color } = useContext(ThemeContext);
  if (!cell) return null;
  const { isChecked, bingoNumber } = cell;

  return (
    <StyledCard bg={theme} text={color}>
      <BingoNumber
        className="bingo-number"
        disabled={!bingoNumber}
        onClick={onClick}
      >
        {isChecked && <Chip isInSquare />}
        {bingoNumber && (
          <BingoNumberText className="bingo-number-text">
            {bingoNumber}
          </BingoNumberText>
        )}
      </BingoNumber>
    </StyledCard>
  );
};

CardSquare.propTypes = {
  cell: PropTypes.shape({
    bingoNumber: PropTypes.number,
    isChecked: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default CardSquare;

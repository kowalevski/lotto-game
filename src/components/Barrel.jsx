import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BingoNumber from './BingoNumber';

/**
 * it's same as bingo ball
 */
const StyledBarrel = styled.div`
  margin-left: 20px;

  img {
    width: 45px;
  }
`;

const Barrel = ({ bingoNumber }) => {
  return (
    <StyledBarrel>
      <BingoNumber number={bingoNumber} isBouncing isInBarrel />
      <img src="./barrel.png" alt="barrel" />
    </StyledBarrel>
  );
};

Barrel.propTypes = {
  bingoNumber: PropTypes.number.isRequired
};

export default Barrel;

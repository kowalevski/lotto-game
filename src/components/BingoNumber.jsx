import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNumber = styled.div`
  font-size: 17px;
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  background: #ff6100;
  border-radius: 50px;
  color: white;
  margin: 0 5px 5px 0;
  display: inline-block;

  ${({ isInBarrel }) =>
    isInBarrel &&
    `
    margin: 0 auto 10px auto;  
    display: block;
  `}

  ${({ isBouncing }) =>
    isBouncing &&
    `
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: bounce;

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    50% {
      transform: scale(1.2, 1.2) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
  `}
`;

const BingoNumber = ({ number, isBouncing, isInBarrel }) => {
  return (
    <StyledNumber isBouncing={isBouncing} isInBarrel={isInBarrel}>
      {number}
    </StyledNumber>
  );
};

BingoNumber.propTypes = {
  number: PropTypes.number.isRequired,
  isBouncing: PropTypes.bool,
  isInBarrel: PropTypes.bool
};

BingoNumber.defaultProps = {
  isBouncing: false,
  isInBarrel: false
};

export default BingoNumber;

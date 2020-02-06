import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import styled from 'styled-components';
import CardSquare from './CardSquare';
import utils from '../utils';

const StyledRow = styled(Row)`
  overflow: hidden;

  &:first-child {
    border-radius: 3px 3px 0 0;
  }
  &:last-child {
    border-radius: 0 0 3px 3px;
  }
`;

const Scorecard = () => {
  const [bingoNumbers, setBingoNumbers] = useState(utils.generateBingoNumber());

  const handleCover = (rowKey, bnKey) => {
    setBingoNumbers({
      ...bingoNumbers,
      [rowKey]: {
        ...bingoNumbers[rowKey],
        [bnKey]: {
          ...bingoNumbers[rowKey][bnKey],
          isChecked: true
        }
      }
    });
  };

  return (
    <Card border="info">
      <Card.Header>Your Card</Card.Header>
      <Card.Body>
        {Object.keys(bingoNumbers).map(rowKey => (
          <StyledRow>
            {Object.keys(bingoNumbers[rowKey]).map(bnKey => (
              <CardSquare
                bingoNumber={bingoNumbers[rowKey][bnKey].bingoNumber}
                isChecked={bingoNumbers[rowKey][bnKey].isChecked}
                onCover={() => handleCover(rowKey, bnKey)}
              />
            ))}
          </StyledRow>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Scorecard;

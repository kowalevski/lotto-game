import React, { useState, useContext, memo, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardSquare from './CardSquare';
import utils from '../utils';
import { ThemeContext } from '../ThemeSwitcher';

const StyledRow = styled(Row)`
  overflow: hidden;

  &:first-child {
    border-radius: 3px 3px 0 0;
  }
  &:last-child {
    border-radius: 0 0 3px 3px;
  }
`;

const Scorecard = memo(({ draggedChipId, onDrop, onReset }) => {
  const { cells, rows } = useMemo(() => utils.generateBingoNumbers(), []);
  const [cardNumbers, setBingoNumbers] = useState({ ...cells });
  const { theme, color } = useContext(ThemeContext);

  const handleCover = cellId => {
    const { bingoNumber, isChecked, chipId } = cardNumbers[cellId];

    if (chipId !== null) {
      setBingoNumbers({
        ...cardNumbers,
        [cellId]: { bingoNumber, isChecked: false, chipId: null }
      });
      onReset(chipId);
      return;
    }

    if (draggedChipId === null) return;

    setBingoNumbers({
      ...cardNumbers,
      [cellId]: { bingoNumber, isChecked: !isChecked, chipId: draggedChipId }
    });
    onDrop();
  };

  return (
    <Card bg={theme} text={color}>
      <Card.Header>
        <Row className="justify-content-between align-items-center">
          <Col md={12}>Your Card</Col>
        </Row>
      </Card.Header>
      <Card.Body className="scorecard">
        {Object.keys(rows).map(rowKey => (
          <StyledRow className="justify-content-center">
            {rows[rowKey].map(bnKey => (
              <CardSquare
                cell={cardNumbers[bnKey]}
                onClick={() => handleCover(bnKey)}
              />
            ))}
          </StyledRow>
        ))}
      </Card.Body>
    </Card>
  );
});

Scorecard.propTypes = {
  draggedChipId: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Scorecard;

import React, { useState, useContext, memo, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardSquare from './CardSquare';
import ThemeControl from './ThemeControl';
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

const Scorecard = memo(({ isDragged, onDrop }) => {
  const { cells, rows } = useMemo(() => utils.generateBingoNumbers(), []);
  const [cardNumbers, setBingoNumbers] = useState({ ...cells });
  const { theme, color } = useContext(ThemeContext);

  const handleCover = cellId => {
    if (!isDragged) return;

    const { bingoNumber, isChecked } = cardNumbers[cellId];
    setBingoNumbers({
      ...cardNumbers,
      [cellId]: { bingoNumber, isChecked: !isChecked }
    });
    onDrop();
  };

  return (
    <Card border="info" bg={theme} text={color}>
      <Card.Header>
        <Row className="justify-content-between">
          <Col md={10}>Your Card</Col>
          <Col md={2} className="text-right">
            <ThemeControl />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="scorecard">
        {Object.keys(rows).map(rowKey => (
          <StyledRow>
            {rows[rowKey].map(bnKey => (
              <CardSquare
                cell={cardNumbers[bnKey]}
                onCover={() => handleCover(bnKey)}
              />
            ))}
          </StyledRow>
        ))}
      </Card.Body>
    </Card>
  );
});

Scorecard.propTypes = {
  isDragged: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default Scorecard;

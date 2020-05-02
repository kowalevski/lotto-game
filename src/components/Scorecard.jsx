import React, { useContext, memo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardSquare from './CardSquare';
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

const Scorecard = memo(({ cardNumbers, rows, onCover }) => {
  const { theme, color } = useContext(ThemeContext);

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
                onClick={() => onCover(bnKey)}
              />
            ))}
          </StyledRow>
        ))}
      </Card.Body>
    </Card>
  );
});

Scorecard.propTypes = {
  onCover: PropTypes.func.isRequired,
  cardNumbers: PropTypes.objectOf({
    [PropTypes.string]: PropTypes.objectOf({
      bingoNumber: PropTypes.number,
      chipId: PropTypes.number,
      isChecked: PropTypes.bool
    })
  }).isRequired,
  rows: PropTypes.objectOf({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default Scorecard;

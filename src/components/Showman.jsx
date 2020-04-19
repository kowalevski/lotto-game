import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pouch from './Pouch';
import Barrel from './Barrel';
import Timer from './Timer';

const StyledContent = styled.div`
  display: flex;
  align-items: center;
`;

const Showman = ({ bingoNumber, time }) => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md={9}>Showman</Col>
          <Col md={3} className="text-right">
            <Timer time={time} />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <StyledContent>
          <Pouch />
          <Barrel bingoNumber={bingoNumber} />
        </StyledContent>
      </Card.Body>
    </Card>
  );
};

Showman.propTypes = {
  bingoNumber: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
};

export default Showman;

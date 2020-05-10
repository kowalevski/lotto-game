import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Barrel from './Barrel';

const BingoNumberQuiz = ({ bingoNumber }) => {
  const [answer, setAnswer] = useState('');
  const [isAnswerEntered, setIsAnswerEntered] = useState(false);

  const isValid = !isAnswerEntered || answer === bingoNumber.name;

  const handleChange = e => {
    setAnswer(e.target.value);
    setIsAnswerEntered(true);
  };

  return (
    <Card>
      <Card.Header>Barrels Quiz</Card.Header>
      <Card.Body>
        <Row>
          <Form.Group as={Col} md="4">
            <p>What is the name of this number?</p>
            <Barrel bingoNumber={bingoNumber.number} />
            <Form.Label htmlFor="quiz-answer">Your answer:</Form.Label>
            <Form.Control
              id="quiz-answer"
              type="text"
              onChange={handleChange}
              value={answer}
              isInvalid={!isValid}
            />
            {!isValid && (
              <Form.Control.Feedback type="invalid" role="alert">
                Wrong answer
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
      </Card.Body>
    </Card>
  );
};

BingoNumberQuiz.propTypes = {
  bingoNumber: PropTypes.shape({
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default BingoNumberQuiz;

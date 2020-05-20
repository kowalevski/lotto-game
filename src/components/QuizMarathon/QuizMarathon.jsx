import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuizMarathon = () => {
  return (
    <Card>
      <Card.Header>Quiz Marathon</Card.Header>
      <Card.Body>
        <h2>Welcome to Quiz Marathon!</h2>
        <Link to="/dashboard/quiz-marathon/quiz/1">
          <Button variant="success">Start Marathon</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default QuizMarathon;

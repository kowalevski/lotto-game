import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useQuizMarathonForm from '../../hooks/useQuizMarathonForm';
import { getRandomNamedBingoNumber } from '../../utils';
import { MAX_QUIZ_COUNT } from './constants';

const Quiz = () => {
  const { setFormData } = useQuizMarathonForm();
  const { number } = getRandomNamedBingoNumber();
  const { id } = useParams(); // /dashboard/quiz-marathon/quiz/:id

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="answer">Name of bingo number</Form.Label>
          <Form.Control
            id="answer"
            onChange={({ target }) =>
              setFormData({
                [id]: {
                  guessedNumber: number,
                  answer: target.value
                }
              })
            }
          ></Form.Control>
        </Form.Group>
        {id === MAX_QUIZ_COUNT ? (
          <Link to="/dashboard/quiz-marathon/finish">
            <Button variant="success">Finish</Button>
          </Link>
        ) : (
          <Link to={`/dashboard/quiz-marathon/quiz/${id + 1}`}>
            <Button variant="primary">Next</Button>
          </Link>
        )}
      </Form>
    </>
  );
};

export default Quiz;

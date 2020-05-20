import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import useQuizMarathonForm from '../../hooks/useQuizMarathonForm';

const submitForm = () => Promise.resolve({});

const Finish = () => {
  const { formData, resetFormData } = useQuizMarathonForm();
  const history = useHistory();

  const handleCofirm = () => {
    submitForm(formData)
      .then(() => {
        resetFormData();
        history.push('/dashboard/quiz-marathon/success');
      })
      .catch(error => {
        history.push('/error', { state: { error } });
      });
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Guessed Number</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData).map(key => (
            <tr>
              <td>{key}</td>
              <td>{formData[key].guessedNumber}</td>
              <td>{formData[key].answer}</td>
            </tr>
          ))}
        </tbody>
        <Button onClick={handleCofirm}>Confirm</Button>
      </Table>
    </>
  );
};

export default Finish;

import { useContext } from 'react';
import { QuizMarathonForm } from '../contexts/QuizMarathonContext';

const useQuizMarathonForm = () => {
  const context = useContext(QuizMarathonForm);

  if (!context) {
    throw new Error(
      'hook useQuizMarathonForm must be inside QuizMarathonProvider'
    );
  }

  return context;
};

export default useQuizMarathonForm;

/* eslint-disable react/prop-types */
import React, { createContext, useState, useReducer } from 'react';

const QuizMarathonForm = createContext();

const QuizMarathonProvider = ({ initialValues = {}, ...props }) => {
  const [initialState] = useState(initialValues);
  const [formData, setFormData] = useReducer(state => {
    return state;
  }, initialState);

  const resetFormData = () => setFormData(initialValues);

  return (
    <QuizMarathonForm.Provider
      value={{
        formData,
        setFormData,
        resetFormData
      }}
      {...props}
    ></QuizMarathonForm.Provider>
  );
};

export default QuizMarathonProvider;

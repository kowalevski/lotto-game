import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Gamefield from 'Gamefield';

it('renders without issues', () => {
  const { getByText } = render(<Gamefield onFinishGame={jest.fn()} />);
  const finishBtn = getByText(/Finish Game/i);

  fireEvent.click(finishBtn);
  expect(getByText(/Your Result/i)).toBeTruthy();
});

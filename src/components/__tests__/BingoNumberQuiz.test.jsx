import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import BingoNumberQuiz from '../BingoNumberQuiz';

const mockedBingoNumber = {
  number: 77,
  name: 'Hatchers'
};
const mockedSecondBingoNumber = {
  number: 21,
  name: 'Point'
};

describe('BingoNumberQuiz component', () => {
  it('renders input and label', () => {
    const { getByLabelText } = render(
      <BingoNumberQuiz bingoNumber={mockedBingoNumber} />
    );

    // returns not Label component but Input which is associated with Label by attribute "id" and "htmlFor"
    // also this the same as expect(querySelector(label)).toHaveTextContent('Your answer:')
    const input = getByLabelText(/your answer:/i);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders error message when valus is invalid', () => {
    const { getByLabelText, getByRole, queryByRole, rerender } = render(
      <BingoNumberQuiz bingoNumber={mockedBingoNumber} />
    );
    const input = getByLabelText(/your answer:/i);
    // the same as fireEvent.change(input, { target: { value: 'Hat' }})
    // but with simulation of user experience with input
    user.type(input, mockedSecondBingoNumber.name);
    expect(getByRole('alert')).toHaveTextContent(/wrong answer/i);

    rerender(<BingoNumberQuiz bingoNumber={mockedSecondBingoNumber} />);

    // the same as getByRole but when you use getByRole for smth which doesn't exist - you will get error
    // queryByRole returns null if smth doesn't exist w/o error
    expect(queryByRole('alert')).toBeNull();
  });
});

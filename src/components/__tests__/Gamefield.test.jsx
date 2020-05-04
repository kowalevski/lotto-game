import React from 'react';
import { render } from '@testing-library/react';
import Gamefield from 'Gamefield';

it('renders without issues', () => {
  render(<Gamefield onFinishGame={jest.fn()} />);
});

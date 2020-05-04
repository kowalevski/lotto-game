import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Home from 'Home';

describe('Home component', () => {
  it('renders without issues', () => {
    const { queryByText, getByText } = render(
      <Router>
        <Home />
      </Router>
    );
    const startBtn = getByText(/Start Game/i);
    expect(startBtn).toBeTruthy();

    fireEvent.click(startBtn);
    expect(queryByText(/Start Game/i)).not.toBeTruthy();
  });
});

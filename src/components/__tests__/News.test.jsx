import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import News from '../News';

const Wrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

describe('News component', () => {
  it('renders', () => {
    const { getByText } = render(<News />, { wrapper: Wrapper });

    userEvent.click(getByText(/create new post/i));

    expect(getByText(/Save/i)).toBeInTheDocument();
  });
});

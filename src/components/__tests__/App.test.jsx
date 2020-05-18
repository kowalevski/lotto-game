import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render as libRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const render = (ui, { historyOptions = {}, ...options }) => {
  const history = createMemoryHistory(historyOptions);

  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired
  };

  return libRender(ui, { ...options, wrapper: Wrapper });
};

describe('App component', () => {
  it('renders different pages: Dashboard (Home), SignIn, SignUp', () => {
    const { getByText, getByRole } = render(<App />, {
      historyOptions: {
        initialEntries: ['/']
      }
    });

    let homeLink = getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('navbar-brand');

    userEvent.click(getByText(/sign in/i));
    // <h1>Sign In</h1>
    expect(getByRole('heading')).toHaveTextContent(/sign in/i);
    userEvent.click(getByText(/home/i));
    // we are on Home page again
    homeLink = getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('navbar-brand');

    userEvent.click(getByText(/sign up/i));
    expect(getByRole('heading')).toHaveTextContent(/sign up/i);
  });
  it('renders 404 page not found', () => {
    const { getByRole } = render(<App />, {
      historyOptions: {
        initialEntries: ['/route-does-not-exist']
      }
    });
    expect(getByRole('alert')).toHaveTextContent(/404 page not found/i);
  });
});

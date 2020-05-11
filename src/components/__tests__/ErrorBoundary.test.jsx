import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import { reportError as mockReportError } from '../../api';

jest.mock('../../api');

/**
 * for some reason jsdom and react-dom show console.error with weird description
 * so if we want to see "clear" tests here we need to mock console.error
 * just for these tests
 *
 */
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

/**
 * IMPORTANT
 * we mocked console.error because this function used by jsdom and react-dom
 * and they are show some weird description which is useless
 * but we need to back original implementation of console.error for some cases when
 * console.error is used for important info
 */
afterAll(() => {
  console.error.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

const Danger = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('💥');
  }

  return null;
};

Danger.propTypes = {
  shouldThrow: PropTypes.bool
};

describe('ErrorBoundary component', () => {
  it('renders alert of error and send report about error', () => {
    // the same as jest.fn().mockImplementationOnce(() => Promise.resolve({ success: true }));
    mockReportError.mockResolvedValueOnce({ success: true });

    const { rerender, getByText, getByRole, queryByRole } = render(
      <ErrorBoundary>
        <Danger />
      </ErrorBoundary>
    );

    rerender(
      <ErrorBoundary>
        <Danger shouldThrow />
      </ErrorBoundary>
    );

    const error = expect.any(Error);
    const info = { componentStack: expect.stringContaining('Danger') }; // see what is "info" argument in componentDidCatch
    expect(mockReportError).toHaveBeenCalledWith(error, info);
    expect(mockReportError).toHaveBeenCalledTimes(1);

    expect(getByRole(/alert/i).textContent).toMatchInlineSnapshot(
      `"Something was wrongTry Again?"`
    );

    // Resets all information stored in the mockFn.mock.calls...
    // it needed because we expect that these functions won't be called when component Danger doesn't have exception
    // if we don't clear information about calls of these functions then expectations on lines 83, 84 won't pass
    // because these functions will be like called (at least one time)
    console.error.mockClear();
    mockReportError.mockClear();

    rerender(
      <ErrorBoundary>
        <Danger />
      </ErrorBoundary>
    );

    fireEvent.click(getByText(/try again/i));

    expect(mockReportError).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    expect(queryByRole(/alert/i)).not.toBeInTheDocument();
  });
});

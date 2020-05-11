import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WinnerStausVerification from '../WinnerStatusVerification';
import { fetchWinnerStatus as mockFetchWinnerStatus } from '../../api';

jest.mock('../../api');

const mockedWinnerStatus = 'Test Winner Status';

describe('WinnerStausVerification component', () => {
  it('renders winner status on submit', async () => {
    mockFetchWinnerStatus.mockResolvedValueOnce(mockedWinnerStatus);

    const { getByLabelText, getByText, getByRole } = render(
      <WinnerStausVerification />
    );
    const input = getByLabelText(/your username/i);
    const submitBtn = getByText(/submit/i);
    userEvent.type(input, 'John');

    fireEvent.click(submitBtn);
    expect(mockFetchWinnerStatus).toHaveBeenCalledWith('John');
    expect(mockFetchWinnerStatus).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent(mockedWinnerStatus)
    );
  });
});

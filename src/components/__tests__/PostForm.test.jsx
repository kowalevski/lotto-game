import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Redirect as mockRedirect } from 'react-router-dom';
import { createPost as mockCreatePost } from '../../api';
import PostForm from '../PostForm';

jest.mock('../../api');
jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null)
}));

const mockedValues = {
  title: 'test title',
  content: 'some description',
  tags: 'firstTag, secondTag, thirdTag'
};
const mockedUserId = '111222333';

describe('PostForm component', () => {
  it('renders', () => {
    // return Promise
    mockCreatePost.mockResolvedValueOnce(mockedValues);

    const { getByLabelText, getByText } = render(
      <PostForm userId={mockedUserId} />
    );

    userEvent.type(getByLabelText(/title/i), mockedValues.title);
    userEvent.type(getByLabelText(/content/i), mockedValues.content);
    userEvent.type(getByLabelText(/tags/i), mockedValues.tags);
    const saveBtn = getByText(/Save/i);

    userEvent.click(saveBtn);

    expect(saveBtn).toBeDisabled();
    expect(mockCreatePost).toHaveBeenCalledTimes(1);
    expect(mockCreatePost).toHaveBeenCalledWith({
      ...mockedValues,
      authorId: mockedUserId
    });

    // after creating post redirect to...
    waitFor(() =>
      expect(mockRedirect).toHaveBeenCalledWith({
        to: '/blog'
      })
    );
  });
});

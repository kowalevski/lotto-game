import React from 'react';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Redirect as mockRedirect } from 'react-router-dom';
import { createPost as mockCreatePost } from '../../api';
import PostForm from '../PostForm';

jest.mock('../../api');
jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null)
}));

const postBuilder = build('Post', {
  fields: {
    title: fake(f => f.lorem.words()),
    content: fake(f => f.lorem.paragraph()),
    tags: fake(f => f.lorem.words())
  }
});
const userBuilder = build('User', {
  fields: {
    id: sequence()
  }
});

const mockedPost = postBuilder();
const mockedUser = userBuilder();

afterEach(() => {
  mockCreatePost.mockClear();
});

describe('PostForm component', () => {
  it('renders form', () => {
    // return Promise
    mockCreatePost.mockResolvedValueOnce();

    const { getByLabelText, getByText } = render(
      <PostForm userId={mockedUser.id} />
    );

    userEvent.type(getByLabelText(/title/i), mockedPost.title);
    userEvent.type(getByLabelText(/content/i), mockedPost.content);
    userEvent.type(getByLabelText(/tags/i), mockedPost.tags);
    const saveBtn = getByText(/Save/i);

    userEvent.click(saveBtn);

    expect(saveBtn).toBeDisabled();
    expect(mockCreatePost).toHaveBeenCalledTimes(1);
    expect(mockCreatePost).toHaveBeenCalledWith({
      ...mockedPost,
      authorId: mockedUser.id
    });

    // after creating post redirect to...
    waitFor(() => {
      // passed always (event if redirected to another route)
      return expect(mockRedirect).toHaveBeenCalledWith({
        to: '/news'
      });
    });

    // mockCreatePost.mockClear();
  });
  it('renders api errors', async () => {
    const errorMsg = 'some error';
    // catch error ==> return Promise.reject(error)
    mockCreatePost.mockRejectedValueOnce({
      error: {
        message: errorMsg
      }
    });

    const { getByText, findByRole } = render(
      <PostForm userId={mockedUser.id} />
    );
    const saveBtn = getByText(/Save/i);

    userEvent.click(saveBtn);

    // searching element until it will be in the DOM
    const alert = await findByRole('alert');
    expect(alert).toHaveTextContent(errorMsg);
    expect(saveBtn).not.toBeDisabled();
  });
});

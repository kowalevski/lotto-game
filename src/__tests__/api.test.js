import api from '../api';

it('returns winner status', async () => {
  const response = await api.fetchWinnerStatus('John');
  expect(response).toBe("You are not winner. Let's try again!💫");

  const response2 = await api.fetchWinnerStatus('Lucky');
  expect(response2).toBe('You are winner!🥳');
});

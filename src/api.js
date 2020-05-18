import { v4 as uuid } from 'uuid';

// mocked http requests

export const fetchWinnerStatus = username =>
  new Promise((resolve, reject) => {
    if (!username) {
      reject();
    }

    const response =
      username === 'Lucky'
        ? 'You are winner!🥳'
        : "You are not winner. Let's try again!💫";

    resolve(response);
  });

export const reportError = (error, info) =>
  new Promise(resolve => resolve()).then(() =>
    JSON.stringify({ error, info, success: true })
  );

export const createPost = params =>
  new Promise(resolve => {
    if (!params.id) {
      throw new Error(); // 💣
    }

    resolve(
      JSON.stringify({
        ...params,
        id: uuid
      })
    );
  });

export default { fetchWinnerStatus, reportError };

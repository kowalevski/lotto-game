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

export default { fetchWinnerStatus, reportError };

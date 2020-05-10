const jestCommon = require('./test/jest-common');

module.exports = {
  ...jestCommon,
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js'
  ]
};

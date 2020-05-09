const jestCommon = require('./jest-common');

module.exports = {
  ...jestCommon,
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom'
};

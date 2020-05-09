const path = require('path');
const jestCommon = require('./jest-common');

module.exports = {
  ...jestCommon,
  displayName: 'server',
  coverageDirectory: path.join(__dirname, '../coverage/server'),
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__server_tests__/**/*.js?(x)']
};

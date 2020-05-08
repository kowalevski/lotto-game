const path = require('path');

module.exports = {
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    'components'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom']
};

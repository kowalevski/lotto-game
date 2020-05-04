const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/named': 'off'
  },
  settings: {
    'import/resolver': 'node'
  },
  overrides: [
    {
      files: ['**/src/**'],
      settings: { 'import/resolver': 'webpack' }
    }
  ]
};

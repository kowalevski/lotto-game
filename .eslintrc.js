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
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/named': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off'
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

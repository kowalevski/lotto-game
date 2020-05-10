module.exports = {
  'src/**/*.+(js|jsx|json)': ['eslint'],
  '**/*.+(js|jsx|json|css|html|md)': [
    'prettier --write',
    'jest --findRelatedTests',
    'git add'
  ]
};

const isTestMode = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestMode ? 'commonjs' : false }],
    '@babel/preset-react',
    'jest'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};

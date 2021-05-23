module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript/base'
  ],
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
  },
};

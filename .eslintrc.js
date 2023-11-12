module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    //'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    //'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    //'comma-dangle': ['error', 'always-multiline'],
  },
};
  
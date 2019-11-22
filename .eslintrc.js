module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'node': true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:angular/johnpapa'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  plugins: [
    '@typescript-eslint',
    'angular',
    'import'
  ],
  rules: {
    'import/prefer-default-export': 0,
    'angular/controller_name': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies' : 0,
    'max-len': [2, 140, 2],
  },

};

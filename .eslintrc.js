module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {},
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'brace-style': ['error', 'stroustrup'],
    'comma-dangle': ['error', 'never'],
    'func-names': ['error', 'never'],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'indent': ['error', 2],
    'max-len': ['off', 120],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': ['error', { "ObjectPattern": { "multiline": true } }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

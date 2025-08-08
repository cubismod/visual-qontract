const path = require('path');

module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
    'camelcase': 'off'
  }
};

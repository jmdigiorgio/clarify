// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier', // Integrates Prettier
  ],
  rules: {
    // Prevent console statements in production
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Enforce consistent export style
    'import/no-anonymous-default-export': 'error',

    // Enforce hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Enforce prop types
    'react/prop-types': 'warn',

    // Prevent unused variables
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};

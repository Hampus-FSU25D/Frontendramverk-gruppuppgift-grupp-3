const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.vite/',
      '.cache/',
      'public/',
      '*.min.js',
      'coverage/',
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { window: true, document: true, navigator: true },
    },
    rules: {
      // keep basic recommended rules; add or adjust as needed
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    },
  },
]);

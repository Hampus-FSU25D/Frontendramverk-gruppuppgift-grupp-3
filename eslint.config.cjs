const { defineConfig } = require('eslint/config');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

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
      globals: {
        window: true,
        document: true,
        navigator: true,
        console: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        alert: true,
        confirm: true,
        prompt: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // keep basic recommended rules; add or adjust as needed
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);

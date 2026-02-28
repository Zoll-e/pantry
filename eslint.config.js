const { config } = require('@pantry/eslint-config/base');

module.exports = [
  ...config,
  {
    ignores: ['node_modules/**', 'dist/**', '**/node_modules/**', '.turbo/**', '**/drizzle/**'],
  },
];

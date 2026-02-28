import { config } from '@pantry/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['node_modules/**', 'dist/**', '**/node_modules/**', '.turbo/**', 'drizzle/**'],
  },
];

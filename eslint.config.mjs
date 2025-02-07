// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
      'node_modules',
      '.husky',
      '.next',
      'out',
      'src/components/ui',
      '.vercel',
    ],
  },
  {
    rules: {
      'no-console': 'error',
    },
  },
);

// Simple flat config without FlatCompat to avoid circular dependency issues
// This is a minimal ESLint config that works with Next.js and TypeScript

import tseslint from 'typescript-eslint'

export default [
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '.vercel/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
    ],
  },
  // TypeScript recommended config
  ...tseslint.configs.recommended,
  // Custom rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
      // Disable react-hooks rules - they require eslint-plugin-react-hooks config
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
]

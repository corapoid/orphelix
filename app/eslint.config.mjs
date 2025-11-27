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
      // CLI and worker files (Node.js)
      'orphelix-cli.js',
      'lib/cli/**/*.js',
      'lib/notifications/**/*.js',
      'lib/db/migrate-*.js',
      'scripts/**/*.js',
    ],
  },
  // TypeScript recommended config
  ...tseslint.configs.recommended,
  // Custom rules for source files
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}', '**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'log'] }],
    },
  },
  // Relaxed rules for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]

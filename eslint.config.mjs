import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginTs from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    ignores: ['tailwind.config.ts', '**/.*'],
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  pluginTs.configs.recommended,
]

import path from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const compat = new FlatCompat({
  baseDirectory: dirName,
  recommendedConfig: pluginJs.configs.recommended,
})

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
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
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
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('next/core-web-vitals'),
  pluginReactConfig,
]

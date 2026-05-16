import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Fix unused vars noise
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^[A-Z_]'
      }],

      // Stylistic rules
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/linebreak-style': 'off',
    },
  },

  pluginReact.configs.flat['jsx-runtime'],
]
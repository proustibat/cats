import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        indent: [ 'warn', 4 ],
        semi: [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'object-curly-spacing': [ 'error', 'always' ],
        'space-in-parens': [ 'error', 'always' ],
        'comma-style': [ 'error', 'last' ],
        'comma-dangle': [ 'error', 'only-multiline' ],
        'template-curly-spacing': [ 'error', 'always' ],
        'brace-style': [ 'error', 'stroustrup', { allowSingleLine: true } ],
        'no-trailing-spaces': [ 'error', { skipBlankLines: true } ],
        'no-new': [ 'off' ],
        'computed-property-spacing': [ 'error', 'never' ],
        'no-unused-expressions': ["error", {
            "allowShortCircuit": true,
            "allowTernary": true
        } ]
    },
  },
)

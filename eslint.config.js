import stylistic from '@eslint/stylistic';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: 'eslint-plugin-react',
      mobx: 'eslint-plugin-mobx',
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:mobx/recommended',
    ],
    rules: {
      ...stylistic.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'mobx/missing-observer': 'error',
    },
  },
];

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    __dirname: 'readonly',
    __filename: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    complexity: ['error', 5],
    'no-console': ['off'],
    'node/no-missing-import': [
      'error',
      {
        allowModules: [],
        resolvePaths: ['node_modules', './src', './tests'],
        tryExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
  extends: [
    '@mondopower/eslint-config-mondo',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
}

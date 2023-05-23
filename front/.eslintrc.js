module.exports = {
  env: {
    // 전역 변수 사용을 정의합니다. 추가하지 않으면 ESLint 규칙에 걸리게 됩니다.
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // 해당 플러그인의 권장 규칙을 사용합니다.
    'plugin:prettier/recommended', // plugin과 eslint-config-prettier 설정을 한번에 합니다.
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      // Delete `␍` prettier/prettier
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    React: 'writable',
  },
};

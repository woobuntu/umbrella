module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    // 이 project 경로는 현재 working directory로 귀결되는데,
    // working directory는 현재 vs코드가 열린 디렉토리이다.
    // 즉, nest프로젝트보다 상위의 디렉토리에서 열린 경우
    // working directory에서 tsconfig.json파일을 찾을 수 없기에
    // eslint가 parsing error를 반환하게 된다.
    // 따라서 아래와 같이 tsconfig의 경로를 .eslintrc.js가 위치한 상대경로로 지정해주어
    // vscode의 working directory와 상관없이 tsconfig를 찾을 수 있게끔 한 것
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

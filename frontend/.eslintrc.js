module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off", // React 17+
    "react/prop-types": "off", // TypeScript 사용 시 불필요
    "@typescript-eslint/no-unused-vars": "warn"
  },
};
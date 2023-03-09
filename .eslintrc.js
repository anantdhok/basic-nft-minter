module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  overrides: [],
  extends: ["next", "next/core-web-vitals", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/ban-ts-comment": 1,
    camelcase: 1,
    "require-jsdoc": 0,
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
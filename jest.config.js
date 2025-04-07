/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/src/**/__tests__/**/*.ts", "**/src/tests/**/*.test.ts"],
  roots: ["<rootDir>/src"],
};

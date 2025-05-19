// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Coincide con tu tsconfig.json paths
    "^@/(.*)$": "<rootDir>/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@styles/(.*)$": "<rootDir>/styles/$1",
    // Si tienes otros alias, añádelos aquí también
  },
};

export default createJestConfig(customJestConfig);

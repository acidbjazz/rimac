// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y .env en tu entorno de prueba
  dir: "./",
});

// Agrega cualquier configuración personalizada de Jest que desees aquí
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Manejar alias de módulos (si los tienes en tsconfig.json)
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/styles/(.*)$": "<rootDir>/styles/$1",
    // Agrega otros alias que uses
  },
  // Si usas TypeScript con un path baseUrl diferente a la raíz del proyecto, necesitas esto:
  // modulePaths: ['<rootDir>'],
};

// createJestConfig es exportado así para asegurar que next/jest pueda cargar la configuración de Next.js
export default createJestConfig(customJestConfig);

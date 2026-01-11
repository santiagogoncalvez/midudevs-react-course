import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // ─────────────────────────────
  // 1️⃣ Ignorar archivos que NO son código de la app
  // ─────────────────────────────
  {
    ignores: [
      'dist',
      'node_modules',
      'tsconfig*.json',
      'vite.config.ts',
      'eslint.config.*',
    ],
  },

  // ─────────────────────────────
  // 2️⃣ Reglas base JS
  // ─────────────────────────────
  js.configs.recommended,

  // ─────────────────────────────
  // 3️⃣ TypeScript type-aware (🔥 CLAVE 🔥)
  // ─────────────────────────────
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...config.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
      },
    },
  })),

  // ─────────────────────────────
  // 4️⃣ React Hooks
  // ─────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.flat.recommended.rules,
  },

  // ─────────────────────────────
  // 5️⃣ React Refresh (Vite)
  // ─────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: reactRefresh.configs.vite.rules,
  },

  // ─────────────────────────────
  // 6️⃣ Globals browser
  // ─────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
];

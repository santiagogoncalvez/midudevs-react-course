// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MASTER_KEY: string;
  readonly VITE_BIN_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const src: string;
//   export default src;
}

declare module '*.png' {
  const src: string;
//   export default src;
}

declare module '*.jpg' {
  const src: string;
//   export default src;
}
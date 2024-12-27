/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly APP_NAME: string;
    readonly APP_ENV: string;
    readonly APP_KEY: string;
    readonly APP_DEBUG: string;
    readonly APP_URL: string;
    readonly DB_CONNECTION: string;
    readonly DB_PATH: string;
    readonly JWT_SECRET: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
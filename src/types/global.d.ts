// src/types/global.d.ts

declare global {
  interface Window {
    DATADOG_API_KEY?: string;
    DATADOG_LOGS_URL?: string;
  }
}

export { };

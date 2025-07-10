// src/globalErrorHandlers.ts

import { defaultLogger, LogLevel } from './logging';

// Catch uncaught errors (e.g., script errors, runtime exceptions)
window.onerror = function (message, source, lineno, colno, error) {
  let err: Error | string | undefined = undefined;
  if (error instanceof Error) {
    err = error;
  } else if (typeof message === 'string') {
    err = message;
  } else {
    err = undefined;
  }
  defaultLogger.log({
    level: LogLevel.ERROR,
    message: 'Global error: ' + String(message),
    error: err,
    context: { source, lineno, colno },
    tags: ['global', 'window.onerror'],
  });
};

// Catch unhandled promise rejections
window.onunhandledrejection = function (event) {
  defaultLogger.log({
    level: LogLevel.ERROR,
    message: 'Unhandled promise rejection',
    error: event.reason,
    context: {},
    tags: ['global', 'unhandledrejection'],
  });
};

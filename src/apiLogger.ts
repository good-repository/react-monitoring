// src/apiLogger.ts

import { LogLevel, Logger } from './logging';

/**

/**
 * Factory to create a fetch wrapper that logs API errors using the provided logger.
 * Usage: const myFetch = createLoggedFetch(myLogger); await myFetch(...)
 */
export function createLoggedFetch(logger: Logger) {
  return async function loggedFetch(input: RequestInfo, init?: RequestInit) {
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        logger.log({
          level: LogLevel.ERROR,
          message: `API error: ${response.status} ${response.statusText}`,
          context: {
            url: typeof input === 'string' ? input : input.url,
            status: response.status,
            statusText: response.statusText,
            method: init?.method || 'GET',
          },
          tags: ['api', 'fetch', 'error'],
        });
      }
      return response;
    } catch (error) {
      let err: Error | string | undefined = undefined;
      if (error instanceof Error) {
        err = error;
      } else if (typeof error === 'string') {
        err = error;
      } else {
        err = JSON.stringify(error);
      }
      logger.log({
        level: LogLevel.ERROR,
        message: 'API fetch exception',
        error: err,
        context: {
          url: typeof input === 'string' ? input : input.url,
          method: init?.method || 'GET',
        },
        tags: ['api', 'fetch', 'exception'],
      });
      throw error;
    }
  };
}

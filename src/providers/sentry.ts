import * as Sentry from '@sentry/react';
import { LogEntry } from '../monitor';

export const initSentry = ({ token, environment }: { token: string; environment?: string }) => {
  Sentry.init({
    dsn: token,
    environment,
    _experiments: { enableLogs: true },
    sendDefaultPii: true,
  });
};

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

const { logger } = Sentry;

export const sentryLogger = (entry: LogEntry) => {
  logger[entry.level as LogLevel](entry.message, {
    ...entry.logProperties,
  });
};

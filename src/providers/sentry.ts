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

type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'fatal';

export const sentryLogger = (entry: LogEntry) => {
  Sentry.captureMessage(entry.message, {
    level: entry.level as LogLevel,
    extra: entry.logProperties,
  });
};

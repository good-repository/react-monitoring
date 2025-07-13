import * as Sentry from '@sentry/react';
import { LogEntry } from '../monitor';

export const initSentry = ({ token, environment }: { token?: string; environment?: string }) => {
  Sentry.init({ dsn: token, environment });
};

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

export const sentryLogger = (entry: LogEntry) => {
  Sentry.captureMessage(entry.message, {
    level: entry.level as SeverityLevel,
    extra: entry.logProperties,
  });
};

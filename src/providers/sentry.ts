import * as Sentry from '@sentry/react';
import { LogEntry } from '../monitor';

export const initSentry = ({ token, env }: { token?: string; env?: string }) => {
  Sentry.init({ dsn: token, environment: env });
};

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

const mountSentryTags = (tags?: string[]) => {
  return tags ? Object.fromEntries(tags.map(tag => [tag, true])) : {};
}

export const sentryLogger = (entry: LogEntry) => {
  Sentry.captureMessage(entry.message, {
    level: entry.level as SeverityLevel,
    tags: mountSentryTags(entry.tags) || [],
    extra: entry.customProperties,
  });
};

import { datadogRum } from '@datadog/browser-rum';
import { LogEntry } from '../monitor';

export const initDatadog = ({ token, env }: { token?: string; env?: string }) => {
  datadogRum.init({
    applicationId: token!,
    clientToken: token!,
    site: 'datadoghq.com',
    service: 'frontend',
    env,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
  });
};

export const datadogLogger = (entry: LogEntry) => {
  datadogRum.addError(entry.message, {
    tags: entry.tags?.join(',') || '',
    ...entry.customProperties,
    level: entry.level,
  });
};

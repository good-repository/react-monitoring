import { datadogLogs } from '@datadog/browser-logs';
import { LogEntry } from '../monitor';

export type Site = 'datadoghq.com' | 'us3.datadoghq.com' | 'us5.datadoghq.com' | 'datadoghq.eu' | 'ddog-gov.com' | 'ap1.datadoghq.com';
export const initDatadog = ({ token, env, site, service, trackErrors }: { token?: string; env?: string, site?: Site, service?: string, trackErrors?: boolean }) => {
  datadogLogs.init({
    clientToken: token!,
    site: site || 'us5.datadoghq.com',
    service: service || 'frontend',
    env,
    sessionSampleRate: 100,
    forwardErrorsToLogs: trackErrors !== undefined ? trackErrors : true,
  });
};

export const datadogLogger = (entry: LogEntry) => {
  datadogLogs.logger[entry.level](entry.message, {
    tags: entry.tags?.join(',') || '',
    ...entry.customProperties,
    level: entry.level,
  });
};

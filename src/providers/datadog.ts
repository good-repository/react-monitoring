import { datadogLogs } from '@datadog/browser-logs';
import { LogEntry } from '../monitor';

type Site = 'datadoghq.com' | 'us3.datadoghq.com' | 'us5.datadoghq.com' | 'datadoghq.eu' | 'ddog-gov.com' | 'ap1.datadoghq.com';
export const initDatadog = ({ token, env, site, service }: { token?: string; env?: string, site?: Site, service?: string }) => {
  datadogLogs.init({
    clientToken: token!,
    site: site || 'us5.datadoghq.com',
    service: service || 'frontend',
    env,
    sessionSampleRate: 100,
  });
};

export const datadogLogger = (entry: LogEntry) => {
  datadogLogs.logger[entry.level](entry.message, {
    tags: entry.tags?.join(',') || '',
    ...entry.customProperties,
    level: entry.level,
  });
};

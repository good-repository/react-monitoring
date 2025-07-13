import { datadogLogs } from '@datadog/browser-logs';
import { LogEntry } from '../monitor';

export type Site = 'datadoghq.com' | 'us3.datadoghq.com' | 'us5.datadoghq.com' | 'datadoghq.eu' | 'ddog-gov.com' | 'ap1.datadoghq.com';
export const initDatadog = ({ token, environment, site, service, trackErrors }: { token?: string; environment?: string, site?: Site, service?: string, trackErrors?: boolean }) => {
  datadogLogs.init({
    clientToken: token!,
    site: site || 'us5.datadoghq.com',
    service: service || 'frontend',
    env: environment || 'production',
    sessionSampleRate: 100,
    forwardErrorsToLogs: trackErrors !== undefined ? trackErrors : true,
  });
};

export const datadogLogger = (entry: LogEntry) => {
  datadogLogs.logger[entry.level](entry.message, {
    ...entry.logProperties,
    level: entry.level,
  });
};

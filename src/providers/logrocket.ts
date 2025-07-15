import LogRocket from 'logrocket';

export const initLogRocket = ({ token, environment }: { token: string; environment?: string }) => {
  LogRocket.init(token, {
    release: environment,
  });
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export const logRocketLogger = (entry: { level: LogLevel; message: string; logProperties?: Record<string, any> }) => {
  LogRocket.log(entry.message, {
    ...entry.logProperties,
    level: entry.level,
  });
};
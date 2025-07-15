import LogRocket from 'logrocket';

export const initLogRocket = ({ token, environment, trackErrors }: { token: string; environment?: string, trackErrors?: boolean }) => {
  LogRocket.init(token, {
    release: environment,
    console: {
      isEnabled: trackErrors !== undefined ? trackErrors : true,
    }
  });
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export const logRocketLogger = (entry: { level: LogLevel; message: string; logProperties?: Record<string, any> }) => {
  LogRocket[entry.level as LogLevel](entry.message, {
    ...entry.logProperties,
  });
};
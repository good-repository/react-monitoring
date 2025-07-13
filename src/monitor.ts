import { initSentry, sentryLogger } from './providers/sentry';
import { initDatadog, datadogLogger, Site } from './providers/datadog';
import { customLogger } from './providers/custom';
import { logger } from './logger';

export type Provider = 'sentry' | 'datadog' | 'custom';

interface BaseConfig {
  provider: Provider;
  token?: string;
  environment?: string;
  service?: string;
  site?: string;
  trackErrors?: boolean;
  customLoggerFn?: (entry: LogEntry) => void;
  errorBoundary?: {
    fallback?: React.ReactNode;
    logOptions?: Partial<LogEntry> & { message?: string };
  };
}

export interface LogEntry {
  message: string;
  level: 'info' | 'warn' | 'error';
  logProperties?: Record<string, any>;
}

interface DatadogConfig extends BaseConfig {
  provider: 'datadog';
  site?: Site;
}

interface SentryConfig extends BaseConfig {
  provider: 'sentry';
}

interface CustomConfig extends BaseConfig {
  provider: 'custom';
  customLoggerFn: (entry: LogEntry) => void;
}

export type MonitorInitConfig = DatadogConfig | SentryConfig | CustomConfig;

let globalErrorBoundaryOptions: {
  fallback?: React.ReactNode;
  logOptions?: Partial<LogEntry> & { message?: string };
} = {};

export const monitor = {
  init(config: MonitorInitConfig) {
    switch (config.provider) {
      case 'sentry':
        initSentry(config);
        logger.setHandler(sentryLogger);
        break;
      case 'datadog':
        initDatadog(config);
        logger.setHandler(datadogLogger);
        break;
      case 'custom':
        if (!config.customLoggerFn) throw new Error('Custom logger function required');
        logger.setHandler((entry) => customLogger(config.customLoggerFn!, entry));
        break;
    }

    globalErrorBoundaryOptions = config.errorBoundary || {};
  },

  getErrorBoundaryDefaults() {
    return globalErrorBoundaryOptions;
  },
};

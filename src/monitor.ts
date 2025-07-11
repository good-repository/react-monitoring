import { initSentry, sentryLogger } from './providers/sentry';
import { initDatadog, datadogLogger, Site } from './providers/datadog';
import { customLogger } from './providers/custom';
import { logger } from './logger';

export type Provider = 'sentry' | 'datadog' | 'custom';

interface MonitorConfig {
  provider: Provider;
  token?: string;
  env?: string;
  customLoggerFn?: (entry: LogEntry) => void;
  trackErrors?: boolean;
  site?: Site;
  service?: string;
}

export interface LogEntry {
  message: string;
  tags?: string[];
  level: 'info' | 'warn' | 'error';
  customProperties?: Record<string, any>;
}

export const monitor = {
  init(config: MonitorConfig) {
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
  }
};
import React from 'react';
import { initSentry, sentryLogger } from './providers/sentry';
import { initDatadog, datadogLogger, Site } from './providers/datadog';
import { customLogger } from './providers/custom';
import { logger } from './logger';
import { initLogRocket, logRocketLogger } from './providers/logrocket';

export type Provider = 'sentry' | 'datadog' | 'logRocket' | 'custom';

type ErrorBoundaryDefaultValues = {
  fallback?: React.ReactNode;
  logOptions?: Partial<LogEntry> & { message?: string };
};

interface BaseConfig {
  provider: Provider;
  token: string;
  environment?: string;
  service?: string;
  site?: string;
  trackErrors?: boolean;
  customLoggerFn?: (entry: LogEntry) => void;
  errorBoundaryDefaultValues?: ErrorBoundaryDefaultValues;
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

interface LogRocketConfig extends BaseConfig {
  provider: 'logRocket';
}

interface CustomConfig extends BaseConfig {
  provider: 'custom';
  customLoggerFn: (entry: LogEntry) => void;
}

export type MonitorInitConfig = DatadogConfig | SentryConfig | LogRocketConfig | CustomConfig;

export let globalErrorBoundaryOptions: {
  fallback?: React.ReactNode;
  logOptions?: Partial<LogEntry> & { message?: string };
} = {};

const defaultErrorBoundaryOptions: ErrorBoundaryDefaultValues = {
  fallback: <div>Something went wrong.</div>,
  logOptions: {
    level: "error",
    message: "An error occurred in the application",
    logProperties: {},
  },
};

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
      case 'logRocket':
        initLogRocket(config);
        logger.setHandler(logRocketLogger);
        break;
      case 'custom':
        if (!config.customLoggerFn) throw new Error('Custom logger function required');
        logger.setHandler((entry) => customLogger(config.customLoggerFn!, entry));
        break;
    }

    globalErrorBoundaryOptions = config.errorBoundaryDefaultValues || defaultErrorBoundaryOptions;
  },
};

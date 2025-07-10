import { DatadogLogger } from './datadogLogger';

/**
 * LogLevel defines the severity of the log message.
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

/**
 * LogContext provides additional context for a log entry.
 */
export interface LogContext {
  [key: string]: any;
}

/**
 * LogEntry is the standard structure for logging events.
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  error?: Error | string;
  context?: LogContext;
  timestamp?: string; // ISO string
  tags?: string[];
  // Optionally, add traceId, userId, etc. for distributed tracing
}

/**
 * Logger interface for pluggable loggers (e.g., Datadog, Console, API).
 */
export interface Logger {
  log(entry: LogEntry): void | Promise<void>;
}

/**
 * Default logger (Datadog-based, can be replaced with custom).
 */
export const defaultLogger: Logger = new DatadogLogger();

/**
 * Example usage of the logging structure with Datadog.
 *
 * import { defaultLogger, LogLevel } from './logging';
 *
 * defaultLogger.log({
 *   level: LogLevel.ERROR,
 *   message: 'Something went wrong',
 *   error: new Error('Oops'),
 *   context: { userId: 123 },
 *   tags: ['react', 'boundary'],
 * });
 */

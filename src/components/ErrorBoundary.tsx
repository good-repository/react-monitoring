import React from 'react';
import { logger } from '../logger';
import { globalErrorBoundaryOptions, LogEntry } from '../monitor';
import { monitor } from '../monitor';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  logOptions?: Partial<LogEntry> & { message?: string };
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const globalOpts = globalErrorBoundaryOptions;
    const logOptions = { ...globalOpts.logOptions, ...this.props.logOptions };

    const logEntry: LogEntry = {
      message: this.props.logOptions?.message || globalOpts.logOptions?.message || error.message,
      level: logOptions?.level || 'error',
      logProperties: {
        stack: error.stack,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        componentStack: info.componentStack,
        ...logOptions?.logProperties,
      },
    };

    logger[logEntry.level](logEntry);
  }

  render() {
    const globalFallback = globalErrorBoundaryOptions.fallback;
    if (this.state.hasError) {
      return this.props.fallback ?? globalFallback ?? null;
    }
    return this.props.children;
  }
}

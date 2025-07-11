import React from 'react';
import { logger } from '../logger';
import { LogEntry } from '../monitor';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  logOptions?: Partial<LogEntry> & { message?: string };
}

export class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    switch (this.props.logOptions?.level) {
      case 'warn':
        logger.warn({
          message: this.props.logOptions?.message || error.message,
          tags: this.props.logOptions?.tags || ['error-boundary'],
          customProperties: {
            stack: error.stack,
            componentStack: info.componentStack,
            ...this.props.logOptions?.customProperties,
          },
        });
        break;
      case 'info':
        logger.info({
          message: this.props.logOptions?.message || error.message,
          tags: this.props.logOptions?.tags || ['error-boundary'],
          customProperties: {
            stack: error.stack,
            componentStack: info.componentStack,
            ...this.props.logOptions?.customProperties,
          },
        });
        break;
      case 'error':
      default:
        logger.error({
          message: this.props.logOptions?.message || error.message,
          tags: this.props.logOptions?.tags || ['error-boundary'],
          customProperties: {
            stack: error.stack,
            componentStack: info.componentStack,
            ...this.props.logOptions?.customProperties,
          },
        });
        break;
    }
  }

  render() {
    return this.props.fallback || this.props.children;
  }
}
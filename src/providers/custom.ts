import { LogEntry } from '../monitor';

export const customLogger = (fn: (entry: LogEntry) => void, entry: LogEntry) => {
  fn(entry);
};

// components/ErrorBoundary.tsx
import React from 'react';
import { logger } from '../logger';

interface Props {
  children: React.ReactNode;
  tags?: string[];
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logger.error({
      message: error.message,
      tags: this.props.tags || ['error-boundary'],
      customProperties: {
        stack: error.stack,
        componentStack: info.componentStack,
      },
    });
  }

  render() {
    return this.props.children;
  }
}
import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { LogEntry } from '../monitor';
import { monitor } from '../monitor';

type LogOptions = Partial<LogEntry> & { message?: string };

export function withErrorBoundary<P extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
  logOptions?: LogOptions,
  fallback?: React.ReactNode
): React.FC<P> {
  const defaults = monitor.getErrorBoundaryDefaults();

  return function WrappedWithBoundary(props: P) {
    return (
      <ErrorBoundary
        fallback={fallback ?? defaults.fallback}
        logOptions={logOptions ?? defaults.logOptions}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { LogEntry } from '../monitor';

export const withErrorBoundary = (
  Component: React.ComponentType,
  logOptions?: Partial<Omit<LogEntry, 'message'>> & { message?: string }
) => (props: any) => (
  <ErrorBoundary logOptions={logOptions}>
    <Component {...props} />
  </ErrorBoundary>
);
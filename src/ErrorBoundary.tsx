import React from 'react';
import { defaultLogger, Logger, LogEntry, LogLevel } from './logging';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }, logger: Logger) => void;
  logger?: Logger;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: { componentStack: string | null | undefined } | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, info: { componentStack: info.componentStack ?? '' } });
    const logger = this.props.logger || defaultLogger;
    // Log the error using the logging structure
    const entry: LogEntry = {
      level: LogLevel.ERROR,
      message: 'ErrorBoundary caught an error',
      error,
      context: { componentStack: info.componentStack },
      tags: ['react', 'error-boundary'],
    };
    logger.log(entry);
    if (this.props.onError) {
      this.props.onError(error, { componentStack: info.componentStack ?? '' }, logger);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// HOC usage
export function withErrorBoundary<P extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.FC<P> {
  return function ErrorBoundaryHOC(props: P) {
    return (
      <ErrorBoundary {...(errorBoundaryProps || {})}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

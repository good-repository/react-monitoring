import React from 'react';

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
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
    if (this.props.onError) {
      this.props.onError(error, { componentStack: info.componentStack ?? '' });
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

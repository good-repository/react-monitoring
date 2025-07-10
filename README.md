
# react-monitoring


![npm](https://img.shields.io/npm/v/react-monitoring?style=flat-square)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github&style=flat-square)](https://github.com/good-repository/react-monitoring)


A reusable React Error Boundary component for React applications. Use as a wrapper or as a higher-order component (decorator).

**GitHub:** [good-repository/react-monitoring](https://github.com/good-repository/react-monitoring)
**npm:** [react-monitoring](https://www.npmjs.com/package/react-monitoring)

## Features
- Use as a wrapper component
- Use as a higher-order component (HOC/decorator)
- Custom fallback UI
- Optional error callback

## Installation


```sh
npm install react-monitoring
```

## Usage

### 1. As a Wrapper Component

```tsx
import { ErrorBoundary } from 'react-monitoring';

function MyComponent() {
  // ...your component code
}

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Custom error message</div>}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 2. As a Higher-Order Component (Decorator)

```tsx
import { withErrorBoundary } from 'react-monitoring';

function MyComponent() {
  // ...your component code
}

export default withErrorBoundary(MyComponent, {
  fallback: <div>Custom error message</div>,
  onError: (error, info) => {
    // Log error or send to monitoring
  }
});
```


## API


### Logging Structure (`src/logging.ts`)

This package provides a logging structure that is agnostic and can be used for error boundaries, Sagas, or any API call. You can plug in Datadog, your own API, or any logger by implementing the `Logger` interface.

#### LogEntry
```ts
type LogEntry = {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  error?: Error | string;
  context?: Record<string, any>;
  timestamp?: string; // ISO string
  tags?: string[];
};
```

#### Logger Interface
```ts
interface Logger {
  log(entry: LogEntry): void | Promise<void>;
}
```

#### Default Logger
The default logger logs to the console. You can replace it with a Datadog logger or your own implementation.

#### Datadog Logger
You can log directly to Datadog using the provided `DatadogLogger`:
```ts
import { DatadogLogger } from 'react-monitoring/dist/datadogLogger';
const logger = new DatadogLogger('YOUR_API_KEY');
logger.log({
  level: 'error',
  message: 'Something went wrong',
  error: new Error('Oops'),
  context: { userId: 123 },
  tags: ['react', 'boundary'],
});
```
You can also set the API key globally on `window.DATADOG_API_KEY` for browser usage.


#### Usage Example: Custom Logger
```ts
import { Logger, LogEntry } from 'react-monitoring/dist/logging';

export const myLogger: Logger = {
  log(entry: LogEntry) {
    // Send to your own API, Sentry, etc.
    fetch('https://my-api.com/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  }
};
```

### API Logging (fetch)

Use the factory to create a fetch wrapper with your logger:
```ts
import { createLoggedFetch } from 'react-monitoring/dist/apiLogger';
import { DatadogLogger } from 'react-monitoring/dist/datadogLogger';

const logger = new DatadogLogger('YOUR_API_KEY');
const myFetch = createLoggedFetch(logger);

// Usage in async/await or Sagas
const response = await myFetch('/api/data');
if (!response.ok) {
  // handle error
}
```

### ErrorBoundary Usage with Custom Logger

```tsx
import { ErrorBoundary } from 'react-monitoring';
import { DatadogLogger } from 'react-monitoring/dist/datadogLogger';

const logger = new DatadogLogger('YOUR_API_KEY');

export default function App() {
  return (
    <ErrorBoundary
      fallback={<div>Custom error message</div>}
      logger={logger}
      onError={(error, info, logger) => {
        logger.log({
          level: 'error',
          message: 'Boundary error',
          error,
          context: info,
        });
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Microfrontend & Advanced Usage

- Each microfrontend can create and inject its own logger instance.
- No global logger is required; all utilities accept a logger parameter or prop.
- You can enrich logs with microfrontend name, version, or user context.

### `<ErrorBoundary />`
Props:
- `fallback` (ReactNode): Custom fallback UI
- `onError` (function): Callback when error is caught (receives error, info, and logger)
- `children` (ReactNode): Child components

### `withErrorBoundary(Component, errorBoundaryProps)`
- `Component`: The component to wrap
- `errorBoundaryProps`: Props for the error boundary (except `children`)

## License
MIT


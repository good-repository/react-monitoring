

# react-monitoring

> **React Error Monitoring & Logging Toolkit**

![npm](https://img.shields.io/npm/v/react-monitoring?style=flat-square)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github&style=flat-square)](https://github.com/good-repository/react-monitoring)

`react-monitoring` is a flexible toolkit for error monitoring and logging in React applications. It provides:

- **Agnostic logging structure** for any backend (Datadog, Sentry, custom API, etc.)
- **React Error Boundary** and HOC for UI error capture
- **API call logging** (fetch, saga, axios, etc.)
- **Microfrontend-ready**: no globals, logger injection everywhere

---

## Installation

```sh
npm install react-monitoring
```

---

## Usage: Step by Step

### 1. Create a Logger (Datadog Example)

```ts
import { DatadogLogger } from 'react-monitoring/dist/datadogLogger';
const logger = new DatadogLogger('YOUR_DATADOG_API_KEY');
```

### 2. Log Any Event

```ts
logger.log({
  level: 'error',
  message: 'Something went wrong',
  error: new Error('Oops'),
  context: { userId: 123 },
  tags: ['react', 'boundary'],
});
```

### 3. Log API Calls (fetch)

```ts
import { createLoggedFetch } from 'react-monitoring';
const myFetch = createLoggedFetch(logger);

const response = await myFetch('/api/data');
if (!response.ok) {
  // handle error
}
```

### 4. Use ErrorBoundary in React

```tsx
import { ErrorBoundary } from 'react-monitoring';

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

---

## API Reference

### Logger Interface
```ts
interface Logger {
  log(entry: LogEntry): void | Promise<void>;
}
```

### LogEntry
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

### createLoggedFetch
```ts
function createLoggedFetch(logger: Logger): (input: RequestInfo, init?: RequestInit) => Promise<Response>
```

### ErrorBoundary
Props:
- `fallback` (ReactNode): Custom fallback UI
- `onError` (function): Callback when error is caught (receives error, info, and logger)
- `logger` (Logger): Logger instance to use
- `children` (ReactNode): Child components

### withErrorBoundary
```ts
withErrorBoundary(Component, errorBoundaryProps)
```
- `Component`: The component to wrap
- `errorBoundaryProps`: Props for the error boundary (except `children`)

---

## Microfrontend & Advanced Usage

- Each microfrontend or app can inject its own logger instance.
- No global logger is required; all utilities accept a logger parameter or prop.
- Enrich logs with microfrontend name, version, or user context as needed.

---

## License
MIT




# react-monitoring

> **Agnostic Frontend Monitoring & Logging Toolkit**

![npm](https://img.shields.io/npm/v/react-monitoring?style=flat-square)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github&style=flat-square)](https://github.com/good-repository/react-monitoring)

`react-monitoring` is a flexible, framework-agnostic toolkit for frontend error monitoring and logging. It provides:

- **Agnostic logging structure** for any backend (Datadog, Sentry, custom API, etc.)
- **React Error Boundary** and HOC for UI error capture
- **API call logging** (fetch, saga, axios, etc.)
- **Global error handlers** for white screens and unhandled promise rejections
- **Microfrontend-ready**: no globals, logger injection everywhere

---

## Features

- Plug-and-play logger interface (`Logger`, `LogEntry`)
- Use with Datadog, Sentry, or your own backend
- Log errors from React, API calls, or anywhere
- Works with React, Redux Sagas, microfrontends, and more
- No global singletons: inject logger per usage
- Add custom context (user, environment, microfrontend info)

---

## Installation

```sh
npm install react-monitoring
```

---

## Quick Start

### 1. Logging API (Agnostic)

```ts
import { Logger, LogEntry } from 'react-monitoring';

const myLogger: Logger = {
  log(entry: LogEntry) {
    // Send to your backend, Datadog, Sentry, etc.
    fetch('https://my-api.com/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  }
};

myLogger.log({
  level: 'error',
  message: 'Something went wrong',
  error: new Error('Oops'),
  context: { userId: 123 },
  tags: ['react', 'boundary'],
});
```

### 2. API Call Logging (fetch)

```ts
import { createLoggedFetch } from 'react-monitoring';
const myFetch = createLoggedFetch(myLogger);

const response = await myFetch('/api/data');
if (!response.ok) {
  // handle error
}
```

### 3. React Error Boundary

```tsx
import { ErrorBoundary } from 'react-monitoring';

export default function App() {
  return (
    <ErrorBoundary
      fallback={<div>Custom error message</div>}
      logger={myLogger}
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

### 4. Global Error Handlers (White Screens, Unhandled Promises)

```ts
import { initGlobalErrorHandlers } from 'react-monitoring';
initGlobalErrorHandlers(myLogger);
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

### initGlobalErrorHandlers
```ts
initGlobalErrorHandlers(logger: Logger): void
```
- Sets up global error and unhandled promise rejection logging using the provided logger

---

## Microfrontend & Advanced Usage

- Each microfrontend or app can inject its own logger instance.
- No global logger is required; all utilities accept a logger parameter or prop.
- Enrich logs with microfrontend name, version, or user context as needed.

---

## License
MIT


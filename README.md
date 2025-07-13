
# 🧩 React Monitoring & Logger

A flexible, plug-and-play monitoring and logging library for React applications.

Track errors and logs effortlessly with native support for **Datadog** and custom providers.  
WIP: **Sentry** and  **LogRocket**, if need some specific, open an Issue

Improve your frontend observability and debugging with minimal setup.

Perfect for React developers who want robust error tracking and logging out of the box.

---

## 📦 Installation

```bash
npm install react-monitoring
```

---

## 🚀 Quickstart

```tsx
import { monitor, logger, ErrorBoundary, withErrorBoundary } from 'react-monitoring';

monitor.init({
  provider: 'datadog',
  token: 'YOUR_CLIENT_TOKEN',
  env: 'production',
  service: 'my-frontend-service',
});

logger.info({
  message: 'User logged in successfully',
});
```

---

## 🔧 API

### monitor.init(config: MonitorInitConfig)

Initializes the monitoring system.

```ts
type Site =
  | 'datadoghq.com'
  | 'us3.datadoghq.com'
  | 'us5.datadoghq.com'
  | 'datadoghq.eu'
  | 'ddog-gov.com'
  | 'ap1.datadoghq.com';

interface BaseConfig {
  token?: string;
  env?: string;
  service?: string;
  trackErrors?: boolean;
  customLoggerFn?: (entry: LogEntry) => void;
  errorBoundary?: {
    fallback?: React.ReactNode;
    logOptions?: Partial<LogEntry> & { message?: string };
  };
}

interface DatadogConfig extends BaseConfig {
  provider: 'datadog';
  site?: Site;
}

interface SentryConfig extends BaseConfig {
  provider: 'sentry';
}

interface CustomConfig extends BaseConfig {
  provider: 'custom';
  customLoggerFn: (entry: LogEntry) => void;
}

type MonitorInitConfig = DatadogConfig | SentryConfig | CustomConfig;
```

---

### logger.info / warn / error(entry: LogEntry)

Unified interface for sending logs.

```ts
interface LogEntry {
  message: string;
  level: 'info' | 'warn' | 'error';
  logProperties?: Record<string, any>;
}
```

Example:

```tsx
logger.error({
  message: 'Form submission error',
  logProperties: { field: 'email' },
});
```

---

## 🧱 Error Components

### ErrorBoundary

Catch React errors and log them automatically.

```tsx
<ErrorBoundary
  fallback={<div>Oops, something went wrong!</div>}
  logOptions={{
    level: 'error',
    message: 'Error on the homepage',
  }}
>
  <App />
</ErrorBoundary>
```

If `fallback` or `logOptions` are not provided, global defaults set in `monitor.init()` will be used.

---

### withErrorBoundary HOC

Wrap components with automatic error catching + logging.

```tsx
export default withErrorBoundary(MyComponent, {
  level: 'error',
  message: 'Profile loading failed',
});
```

Also uses global fallback and log options if not specified.

---

## ✨ Features

- Easy setup with full TypeScript support and autocomplete.
- Global fallback UI and error log options.
- Native integrations with **Datadog**.
- Support for custom logging providers.
- React-friendly error capturing with `ErrorBoundary` and `withErrorBoundary`.
- Logging levels: `info`, `warn`, and `error`.

---

## 🧪 Testing

Easily mock your custom logger for unit tests:

```ts
monitor.init({
  provider: 'custom',
  customLoggerFn: jest.fn(),
});
```

---

## 📄 License

MIT

---

## 🔍 Keywords

React, monitoring, logging, error tracking, frontend observability, Sentry, Datadog, LogRocket, error boundary, React hooks, TypeScript


# 🧩 React Monitoring & Logger

A flexible and plug-and-play monitoring and logging solution for React, with native support for **Sentry**, **Datadog**, and custom services.

---

## 📦 Installation

```bash
npm install react-monitoring @sentry/react @datadog/browser-logs
```

---

## 🚀 Quickstart

```tsx
import { monitor, logger, ErrorBoundary, withErrorBoundary } from 'react-monitoring';

monitor.init({
  provider: 'datadog',
  token: 'YOUR_CLIENT_TOKEN',
  env: 'production',
  site: 'datadoghq.com', // Datadog sites autocomplete supported
  service: 'my-frontend-service',
  errorBoundary: {
    fallback: <div>Oops! Something went wrong.</div>,
    logOptions: {
      level: 'error',
      tags: ['global-error'],
      message: 'Global error captured',
    },
  },
});

logger.info({
  message: 'User logged in successfully',
  tags: ['auth'],
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
  tags?: string[];
  level: 'info' | 'warn' | 'error';
  customProperties?: Record<string, any>;
}
```

Example:

```tsx
logger.error({
  message: 'Form submission error',
  tags: ['form', 'validation'],
  customProperties: { field: 'email' },
});
```

---

## 🧱 Error Components

### ErrorBoundary

Catches React errors and logs them automatically.

```tsx
<ErrorBoundary
  fallback={<div>Oops, something went wrong!</div>}
  logOptions={{
    level: 'error',
    tags: ['page-error'],
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
  tags: ['profile'],
  message: 'Profile loading failed',
});
```

Also uses global fallback and log options if not specified.

---

## ✨ Features

- Discriminated typing for `monitor.init` with autocomplete and safety.
- Global fallback UI and error log options configuration.
- Native support for Sentry and Datadog.
- Support for custom loggers.
- Easy integration with `ErrorBoundary` and `withErrorBoundary`.
- Logging levels: `info`, `warn`, `error`.

---

## 🧪 Testing

Easily mock your custom logger:

```ts
monitor.init({
  provider: 'custom',
  customLoggerFn: jest.fn(),
});
```

---

## 📄 License

MIT

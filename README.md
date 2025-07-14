
# 🧩 React Monitoring & Logger

A flexible, plug-and-play monitoring and logging library for React applications.

Easily track logs and runtime errors with native support for **Datadog** and custom providers.  
Coming soon: **Sentry** and **LogRocket** support.  
Need a specific provider? [Open an issue](https://github.com/good-repository/react-monitoring/issues).

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
  environment: 'production',
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

| Property                  | Type                              | Description                                         | Required                         | Default                        |
|---------------------------|-----------------------------------|-----------------------------------------------------|----------------------------------|--------------------------------|
| `provider`                | `"datadog"` \ `"custom"`         | Monitoring provider                                 | ✅ Yes                            | —                              |
| `token`                   | `string`                          | Provider API token                                  | ✅ Yes                            | —                              |
| `environment`             | `string`                          | Environment name (e.g., production, staging)        | 🔶 Recommended                    | `"production"`                 |
| `service`                 | `string`                          | Logical name of the service                         | 🔶 Recommended                    | `"frontend"`                   |
| `site`                    | `string`                          | Provider site domain (Datadog only)                 | 🔶 Recommended (Datadog only)     | Based on provider              |
| `trackErrors`             | `boolean`                         | Automatically forward runtime errors                | ❌ Optional                       | `false`                        |
| `customLoggerFn`          | `(entry: LogEntry) => void`       | Required if using `custom` provider                 | ✅ Yes (for `custom`)             | —                              |
| `errorBoundaryDefaultValues` | `{ fallback?: React.ReactNode, logOptions?: Partial<LogEntry> & { message?: string } }` | Default fallback UI and log settings for errors | ❌ Optional                       | `<div>Something went wrong.</div>`,<br> `{ level: "error", message: "An error occurred in the application", logProperties: {}, }` |

---

### logger.info / logger.warn / logger.error

Unified interface for sending logs.

```ts
interface LogEntry {
  message: string;
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

New to Error Boundaries? [Read the official React docs](https://reactjs.org/docs/error-boundaries.html)

Wraps part of your app to automatically catch and log render-time errors.

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

- `fallback`: React node to render when an error is caught.
- `logOptions`: Optional log config. Defaults come from `monitor.init()`.

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

Need an example? [Here](https://github.com/good-repository/poc-react-monitoring)

---

## 📄 License

MIT

---

## 🔍 Keywords

React, monitoring, logging, error tracking, frontend observability, Sentry, Datadog, LogRocket, error boundary, React hooks, TypeScript

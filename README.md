# 🧩 React Monitoring & Logger

A flexible and plug-and-play logging system for React with support for **Sentry**, **Datadog**, and custom services. Built to be simple, extensible, and production-ready.

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
  provider: 'sentry',
  token: 'YOUR_SENTRY_DSN',
  env: 'production',
});

logger.info({
  message: 'User signed in',
  tags: ['auth'],
});
```

---

## 🔧 API Reference

### monitor.init(config)
Initializes the monitoring provider.

```ts
monitor.init({
  provider: 'sentry' | 'datadog' | 'custom',
  token?: string,
  env?: string,
  customLoggerFn?: (entry: LogEntry) => void,
});
```

#### Parameters:
| Name             | Type                                      | Description                          |
|------------------|-------------------------------------------|--------------------------------------|
| `provider`       | `'sentry' | 'datadog' | 'custom'`         | Required. Which logger to use.       |
| `token`          | `string`                                  | Token/DSN for Sentry or Datadog.     |
| `env`            | `string`                                  | Optional environment name.           |
| `customLoggerFn` | `(entry: LogEntry) => void`               | Required if `provider` is `custom`.  |

---

### logger.info / warn / error
Unified interface for sending logs.

```ts
logger.info({
  message: 'User login successful',
  tags: ['auth'],
  customProperties: { userId: '123' },
});
```

#### LogEntry structure:
```ts
{
  message: string;
  tags?: string[];
  level?: 'info' | 'warn' | 'error'; // optional for manual construction
  customProperties?: Record<string, any>;
}
```

---

## 🧱 ErrorBoundary
Catches React component errors and logs them automatically.

### Usage
```tsx
<ErrorBoundary
  fallback={<div>Something went wrong</div>}
  logOptions={{
    tags: ['page'],
    message: 'Home page crash',
    level: 'error',
    customProperties: { userId: '123' },
  }}
>
  <App />
</ErrorBoundary>
```

#### Props:
| Prop         | Type                                  | Description                             |
|--------------|----------------------------------------|-----------------------------------------|
| `fallback`   | `React.ReactNode`                      | Optional UI on error.                   |
| `logOptions` | `Partial<LogEntry> & { message?: string }` | Logging metadata override.         |

---

## 🎯 withErrorBoundary HOC
Wrap components with automatic error catching + logging.

### Usage
```tsx
export default withErrorBoundary(MyComponent, {
  tags: ['profile'],
  message: 'Profile screen failed',
  level: 'error',
  customProperties: { context: 'profile-load' },
});
```

### Signature
```ts
withErrorBoundary(
  Component: React.ComponentType,
  logOptions?: Partial<LogEntry> & { message?: string }
): React.FC
```

---

## 🧪 Testing
Mock your `customLoggerFn` to assert log behavior:
```ts
monitor.init({
  provider: 'custom',
  customLoggerFn: jest.fn(),
});
```

---

## ✨ Features
- ✅ Type-safe logging (TS/JS)
- ✅ Built-in Sentry & Datadog integrations
- ✅ Full support for custom backends
- ✅ ErrorBoundary component and HOC
- ✅ Auto-log level routing: info / warn / error

---

## 📄 License
MIT
*/

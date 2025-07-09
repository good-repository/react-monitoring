
# react-monitoring


A reusable React Error Boundary component for React applications. Use as a wrapper or as a higher-order component (decorator).

## Features
- Use as a wrapper component
- Use as a higher-order component (HOC/decorator)
- Custom fallback UI
- Optional error callback

## Installation

npm install react-error-boundary-library
```
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

### `<ErrorBoundary />`
Props:
- `fallback` (ReactNode): Custom fallback UI
- `onError` (function): Callback when error is caught
- `children` (ReactNode): Child components

### `withErrorBoundary(Component, errorBoundaryProps)`
- `Component`: The component to wrap
- `errorBoundaryProps`: Props for the error boundary (except `children`)

## License
MIT


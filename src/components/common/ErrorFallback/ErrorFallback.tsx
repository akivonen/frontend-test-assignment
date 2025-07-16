import { FallbackProps } from 'react-error-boundary';

export default function ErrroFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert" className="error-boundary">
      <p>Something went wrong</p>
      <p className="">{error.message}</p>
      <pre className="error-boundary__message">
        {process.env.NODE_ENV === 'development' && error.stack}
      </pre>
      <button
        type="button"
        className="button error-boundary__button"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

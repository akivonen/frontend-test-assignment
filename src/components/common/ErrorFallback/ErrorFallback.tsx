import styles from './ErrorFallback.module.scss';
import { FallbackProps } from 'react-error-boundary';

export default function ErrroFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert" className={styles.ErrorBoundary}>
      <p>Something went wrong</p>
      <p className="">{error.message}</p>
      <pre className={styles.ErrorBoundaryMessage}>
        {process.env.NODE_ENV === 'development' && error.stack}
      </pre>
      <button
        type="button"
        className={styles.errorBoundaryButton}
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

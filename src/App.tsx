import SignUpForm from './components/SignUp/SignUpForm/SignUpForm';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import UserSection from './components/Users/UserSection/UserSection';
import { DataProvider } from './context/DataContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrroFallback from './components/common/ErrorFallback/ErrorFallback';
import SignUpSection from './components/SignUp/SignUpSection/SignUpSection';

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrroFallback}
      onError={(error, info) => {
        console.log('App error:', {
          error,
          componentStack: info.componentStack,
        });
      }}
    >
      <DataProvider>
        <Header />
        <main role="main">
          <Hero />
          <UserSection />
          <SignUpSection>
            <SignUpForm />
          </SignUpSection>
        </main>
      </DataProvider>
    </ErrorBoundary>
  );
}

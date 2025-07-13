import SignupForm from './components/SignUpForm/SignUpForm';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Users from './components/Users/UserSection/UserSection';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Users />
        <SignupForm />
      </main>
    </>
  );
}

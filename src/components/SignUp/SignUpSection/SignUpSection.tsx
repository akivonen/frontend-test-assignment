import { ReactNode } from 'react';

export default function SignUpSection({ children }: { children: ReactNode }) {
  return (
    <section
      id="sign-up"
      className="container sign-up"
      aria-label="Sign up form"
    >
      {children}
    </section>
  );
}

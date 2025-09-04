import styles from './SignUpSection.module.scss';
import { ReactNode } from 'react';

export default function SignUpSection({ children }: { children: ReactNode }) {
  return (
    <section id="sign-up" className={styles.signUp} aria-label="Sign up form">
      {children}
    </section>
  );
}

import styles from './Header.module.scss';
import CompanyLogo from '@assets/images/Logo.svg';
import useScrollTo from '@src/hooks/useScrollTo';

export default function Header() {
  const { scrollToElement } = useScrollTo();

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerContainer}`}>
        <img
          src={CompanyLogo}
          role="img"
          width="104"
          height="26"
          alt="Company logo"
        />
        <nav className={styles.headerNav}>
          <button
            type="button"
            className={styles.headerButton}
            onClick={() => scrollToElement('#users')}
          >
            Users
          </button>
          <button
            type="button"
            className={styles.headerButton}
            onClick={() => scrollToElement('#sign-up')}
          >
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}

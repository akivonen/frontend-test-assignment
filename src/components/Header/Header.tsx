import CompanyLogo from '@src/assets/images/Logo.svg';
import useScrollTo from '@src/hooks/useScrollTo';

export default function Header() {
  const { scrollToElement } = useScrollTo();

  return (
    <header className="header" role="banner">
      <div className="container header__container">
        <CompanyLogo />
        <nav className="header__nav">
          <button
            type="button"
            className="button"
            onClick={() => scrollToElement('#users')}
          >
            Users
          </button>
          <button
            type="button"
            className="button"
            onClick={() => scrollToElement('#sign-up')}
          >
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}

import CompanyLogo from '@src/assets/images/Logo.svg';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container header__container">
        <CompanyLogo />
        <nav className="header__nav">
          <button type="button" className="button">
            Users
          </button>
          <button type="button" className="button">
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}

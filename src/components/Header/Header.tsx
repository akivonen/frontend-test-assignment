import companyLogo from '../../assets/images/Logo.svg';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container header__container">
        <img src={companyLogo} alt="Company Logo" />
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

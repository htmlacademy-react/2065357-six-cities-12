import Logo from '../logo/logo';
import UserProfile from '../user-profile/user-profile';

type HeaderProps = {
  hasNav?: boolean;
}

function Header({ hasNav = true }: HeaderProps): JSX.Element {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {hasNav && <UserProfile />}
        </div>
      </div>
    </header>
  );
}

export default Header;

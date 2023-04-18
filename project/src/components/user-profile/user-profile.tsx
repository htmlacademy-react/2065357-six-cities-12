import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { logoutAction } from '../../store/api-actions';
import { getFavorites } from '../../store/reducers/favorites/selectors';
import { getAuthStatus, getAvatarUrl, getLogin } from '../../store/reducers/user/selectors';
import classes from './user-profile.module.scss';

function UserProfile(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const login = useAppSelector(getLogin);
  const avatarUrl = useAppSelector(getAvatarUrl);
  const favoritesOffersCount = useAppSelector(getFavorites).length;
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus.isAuth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {authorizationStatus.isAuth && <img className={classes.avatar} src={avatarUrl} alt="User avatar" />}
                </div>
                <span className="header__user-name user__name">{login}</span>
                <span className="header__favorite-count">{favoritesOffersCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
                onClick={(evt) => {
                  evt.preventDefault();

                  dispatch(logoutAction());
                }}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>)
          : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>)}
      </ul>
    </nav>
  );
}

export default UserProfile;

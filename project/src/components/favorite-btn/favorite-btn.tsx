import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { toggleFavoriteAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/reducers/user/selectors';

type FavoriteButtonProps = {
  className: 'property' | 'place-card';
  id: number;
  isFavorite: boolean;
}

const sizes = {
  'property': {
    width: 31,
    height: 33,
  },
  'place-card': {
    width: 18,
    height: 19,
  },
};

function FavoriteButton({ className, id, isFavorite }: FavoriteButtonProps): JSX.Element {
  const size = sizes[className];
  const authorizationStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (authorizationStatus.isAuth) {
      dispatch(toggleFavoriteAction({ id: id, isFavorite: !isFavorite }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={cn(`${className}__bookmark-button button`, isFavorite && `${className}__bookmark-button--active`)}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={size.width}
        height={size.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;

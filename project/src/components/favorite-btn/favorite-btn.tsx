import cn from 'classnames';

type FavoriteButtonProps = {
  className: 'property' | 'place-card';
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

function FavoriteButton({ className, isFavorite }: FavoriteButtonProps): JSX.Element {
  const size = sizes[className];

  return (
    <button className={cn(`${className}__bookmark-button button`, isFavorite && `${className}__bookmark-button--active`)} type="button">
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

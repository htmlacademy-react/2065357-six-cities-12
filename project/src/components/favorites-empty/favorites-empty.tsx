import classes from './favorites-empty.module.scss';

function FavoritesEmpty(): JSX.Element {
  return (
    <p className={classes.text}>List is empty</p>
  );
}

export default FavoritesEmpty;

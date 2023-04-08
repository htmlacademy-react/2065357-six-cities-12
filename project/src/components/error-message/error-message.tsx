import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classes from './error-message.module.scss';

function ErrorMessage(): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <div className={classes.box}>
        <p className={classes.text}>☹</p>
        <p className={classes.text}>Failed to load data</p>
        <Link className={classes.btn} to={AppRoute.Main}>Try again</Link>
      </div>
    </div>
  );
}

export default ErrorMessage;

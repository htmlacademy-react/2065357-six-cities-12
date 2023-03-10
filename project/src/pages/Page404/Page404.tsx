import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import classes from './Page404.module.scss';

function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className={`${classes['error']} cities__no-places`}>
              <div className={classes['error__box']}>
                <p className={classes['error__status']}>404</p>
                <p className={classes['error__text']}>Page not found</p>
                <Link className={classes['error__link']} to='/'>Back to main page</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page404;

import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Tabs from '../../components/tabs/tabs';
import { AppRoute } from '../../const';
import classes from './page-404.module.scss';

function Page404(): JSX.Element {
  return (
    <Layout pageTitle="Page not found" className="page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs />

        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className={`${classes.error} cities__no-places`}>
              <div className={classes.box}>
                <p className={classes.status}>404</p>
                <p className={classes.text}>Page not found</p>
                <Link className={classes.link} to={AppRoute.Main}>Back to main page</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page404;

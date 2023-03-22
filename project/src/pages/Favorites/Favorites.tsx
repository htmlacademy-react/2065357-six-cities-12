import Layout from '../../components/layout/layout';
import OffersList from '../../components/offers-list/offers-list';
import { Offers } from '../../types/offer';

type FavoritesProps = {
  offers: Offers;
}

type OffersByCityGroup = {
  [city: string]: Offers;
}

function Favorites({ offers }: FavoritesProps): JSX.Element {
  const offersByCity = offers.reduce((cityGroup: OffersByCityGroup, offer) => {
    const city = offer.city.name;

    if (!cityGroup[city]) {
      cityGroup[city] = [];
    }
    cityGroup[city].push(offer);

    return cityGroup;
  }, {});

  return (
    <Layout pageTitle='Favorites'>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, offersGroup]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OffersList offers={offersGroup} />
                  </div>
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </Layout>
  );
}

export default Favorites;

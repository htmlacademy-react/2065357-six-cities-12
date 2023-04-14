import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getOffers } from '../../store/offers-data/selectors';
import { Offer } from '../../types/offer';

type OffersByCityGroup = {
  [city: string]: Offer[];
}

const getOffersByCityGroup = (offers: Offer[]) =>
  offers.reduce((cityGroup: OffersByCityGroup, offer) => {
    const city = offer.city.name;

    if (!cityGroup[city]) {
      cityGroup[city] = [];
    }
    cityGroup[city].push(offer);

    return cityGroup;
  }, {});

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const offersByCity = getOffersByCityGroup(offers);

  return (
    <Layout pageTitle="Favorites">
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
                  <OffersList offers={offersGroup} classNames="favorites__places" offerCardType={OfferCardType.Favorites} />
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </Layout>
  );
}

export default FavoritesPage;

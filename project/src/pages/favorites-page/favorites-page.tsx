import { useEffect } from 'react';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Layout from '../../components/layout/layout';
import Logo from '../../components/logo/logo';
import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/favorites-slice/selectors';
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
  const offers = useAppSelector(getFavorites);
  const offersByCity = getOffersByCityGroup(offers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <Layout pageTitle="Favorites">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {!offers.length
              ? <FavoritesEmpty />
              : (
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
                </ul>)}
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

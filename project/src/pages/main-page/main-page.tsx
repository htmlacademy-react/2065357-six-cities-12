import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import Tabs from '../../components/tabs/tabs';
import { OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getOffersByCity } from '../../utils/common';
import { getSortedOffers } from '../../utils/sort';
import cn from 'classnames';
import EmptyMessage from '../../components/empty-message/empty-message';
import Loader from '../../components/loader/loader';
import { getOffers, getOffersStatus } from '../../store/reducers/offers/selectors';
import { getCurrentCity, getCurrentSortType } from '../../store/reducers/app/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchOffersAction } from '../../store/api-actions';
import ErrorPage from '../error-page/error-page';

function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const status = useAppSelector(getOffersStatus);
  const city = useAppSelector(getCurrentCity);
  const sortType = useAppSelector(getCurrentSortType);
  const offersByCity = getOffersByCity(city, offers);
  const sortedOffers = getSortedOffers(offersByCity, sortType);

  const isEmpty = !offersByCity.length;

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const onCardHover = (offerId: number | null): void => {
    setSelectedOfferId(offerId);
  };

  if (status.isLoading) {
    return <Loader isSmall={false} />;
  }

  if (status.isError) {
    return <ErrorPage />;
  }

  return (
    <Layout className="page--gray page--main">
      <main className={cn('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>

        <Tabs currentCity={city} />

        <div className="cities">
          <div className={cn('cities__places-container container', isEmpty && 'cities__places-container--empty')}>
            {isEmpty ?
              <EmptyMessage currentCity={city} />
              : (
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {city}</b>

                  <Sort currentSortType={sortType} />

                  <OffersList
                    offers={sortedOffers}
                    classNames="cities__places-list places__list"
                    offerCardType={OfferCardType.Main}
                    onCardHover={onCardHover}
                  />
                </section>)}

            <div className="cities__right-section">
              {!isEmpty && (
                <Map
                  className="cities"
                  location={sortedOffers[0].city.location}
                  offers={sortedOffers}
                  selectedOfferId={selectedOfferId}
                />)}
            </div>
          </div>
        </div>
      </main>
    </Layout >
  );
}

export default MainPage;

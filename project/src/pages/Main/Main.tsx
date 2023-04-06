import { useState } from 'react';
import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import Tabs from '../../components/tabs/tabs';
import { OfferCardType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { Offer } from '../../types/offer';
import { getOffersByCity } from '../../utils/common';
import { getSortedOffers } from '../../utils/sort';
import cn from 'classnames';
import EmptyMessage from '../../components/empty-message/empty-message';

type MainProps = {
  offers: Offer[];
}

function Main({ offers }: MainProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const { city } = useAppSelector((state) => state.offerReducer);
  const { sortType } = useAppSelector((state) => state.offerReducer);

  const offersByCity = getOffersByCity(city, offers);
  const sortedOffers = getSortedOffers(offersByCity, sortType);

  const isEmpty = !offersByCity.length;

  const onCardHover = (offerId: number | null): void => {
    setSelectedOfferId(offerId);
  };

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

export default Main;

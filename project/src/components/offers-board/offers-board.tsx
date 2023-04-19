import { useCallback, useState } from 'react';
import { OfferCardType } from '../../const';
import EmptyMessage from '../empty-message/empty-message';
import OffersList from '../offers-list/offers-list';
import Sort from '../sort/sort';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getIsEmpty, getRenderedOffers } from '../../store/reducers/offers/selectors';
import Map from '../map/map';
import { getCurrentCity, getCurrentSortType } from '../../store/reducers/app/selectors';

function OffersBoard(): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const sortType = useAppSelector(getCurrentSortType);
  const city = useAppSelector(getCurrentCity);
  const renderedOffers = useAppSelector(getRenderedOffers);
  const isEmpty = useAppSelector(getIsEmpty);

  const onCardHover = useCallback((offerId: number | null): void => {
    setSelectedOfferId(offerId);
  }, []);

  return (
    <div className="cities">
      <div className={cn('cities__places-container container', isEmpty && 'cities__places-container--empty')}>
        {isEmpty ?
          <EmptyMessage currentCity={city} />
          : (
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{renderedOffers.length} places to stay in {city}</b>

              <Sort currentSortType={sortType} />

              <OffersList
                offers={renderedOffers}
                classNames="cities__places-list places__list"
                offerCardType={OfferCardType.Main}
                onCardHover={onCardHover}
              />

            </section>)}

        <div className="cities__right-section">
          {!isEmpty && (
            <Map
              className="cities"
              location={renderedOffers[0].city.location}
              offers={renderedOffers}
              selectedOfferId={selectedOfferId}
            />)}
        </div>
      </div>
    </div>
  );
}

export default OffersBoard;

import { useState } from 'react';
import { Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offers;
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [, setActiveOfferCard] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard offer={offer} key={offer.id} onCardHover={setActiveOfferCard} />)}
    </div>
  );
}

export default OffersList;

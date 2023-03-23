import { useState } from 'react';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  classNames: string;
  offerCardType: OfferCardType;
}

function OffersList({ offers, classNames, offerCardType }: OffersListProps): JSX.Element {
  const [, setActiveOfferCard] = useState<number | null>(null);

  return (
    <div className={classNames}>
      {offers.map((offer) =>
        <OfferCard offerCardType={offerCardType} offer={offer} key={offer.id} onCardHover={setActiveOfferCard} />)}
    </div>
  );
}

export default OffersList;

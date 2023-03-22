import { useState } from 'react';
import { PageName } from '../../const';
import { Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offers;
  classNames: string;
  pageName: PageName;
}

function OffersList({ offers, classNames, pageName }: OffersListProps): JSX.Element {
  const [, setActiveOfferCard] = useState<number | null>(null);

  return (
    <div className={classNames}>
      {offers.map((offer) =>
        <OfferCard pageName={pageName} offer={offer} key={offer.id} onCardHover={setActiveOfferCard} />)}
    </div>
  );
}

export default OffersList;

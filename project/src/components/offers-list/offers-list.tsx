import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  classNames: string;
  offerCardType: OfferCardType;
  onCardHover?: (offerId: number | null) => void;
}

function OffersList({ offers, classNames, offerCardType, onCardHover }: OffersListProps): JSX.Element {
  return (
    <div className={classNames}>
      {offers.map((offer) =>
        <OfferCard offerCardType={offerCardType} offer={offer} key={offer.id} onCardHover={onCardHover} />)}
    </div>
  );
}

export default OffersList;

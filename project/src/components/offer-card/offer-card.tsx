import { Offer } from '../../types/offer';
import { ucFirst } from '../../utils/common';
import { convertRatingToPercent } from '../../utils/offer';
import { AppRoute, OfferCardType } from '../../const';
import { generatePath, Link } from 'react-router-dom';
import FavoriteButton from '../favorite-btn/favorite-btn';
import Mark from '../mark/mark';

type OfferCardProps = {
  offerCardType: OfferCardType;
  offer: Offer;
  onCardHover: (activeCard: number | null) => void;
}

const sizes = {
  [OfferCardType.Main]: {
    width: 260,
    height: 200
  },
  [OfferCardType.Favorites]: {
    width: 150,
    height: 110
  },
  [OfferCardType.Offer]: {
    width: 260,
    height: 200
  }
};

function OfferCard({ offerCardType, offer, onCardHover }: OfferCardProps): JSX.Element {
  const size = sizes[offerCardType];

  return (
    <article
      className={`${offerCardType}__card place-card`}
      onMouseOver={() => onCardHover(offer.id)}
      onMouseOut={() => onCardHover(null)}
    >

      {offer.isPremium && <Mark className="place-card__mark" text="Premium" />}

      <div className={`${offerCardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id: `${offer.id}` })}>
          <img className="place-card__image"
            src={offer.previewImage}
            width={size.width}
            height={size.height}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton className="place-card" isFavorite={offer.isFavorite} />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${convertRatingToPercent(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{ucFirst(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;

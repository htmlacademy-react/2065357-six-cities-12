import { Offer } from '../../types/offer';
import { ucFirst } from '../../utils/common';
import { convertRaitingToPercent } from '../../utils/offer';
import cn from 'classnames';
import { PageName } from '../../const';

type OfferCardProps = {
  pageName: PageName;
  offer: Offer;
  onCardHover: (activeCard: number | null) => void;
}

function OfferCard({ pageName, offer, onCardHover }: OfferCardProps): JSX.Element {
  return (
    <article
      className={`${pageName}__card place-card`}
      onMouseOver={() => onCardHover(offer.id)}
      onMouseOut={() => onCardHover(null)}
    >

      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${pageName}__image-wrapper place-card__image-wrapper`}>
        <a href="/#">
          <img className="place-card__image"
            src={offer.previewImage}
            width={pageName === PageName.Favorites ? '150' : '260'}
            height={pageName === PageName.Favorites ? '110' : '200'}
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={cn('place-card__bookmark-button button', offer.isFavorite && 'place-card__bookmark-button--active')} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${convertRaitingToPercent(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{ucFirst(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
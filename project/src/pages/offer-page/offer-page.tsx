import GoodsList from '../../components/goods-list/goods-list';
import Layout from '../../components/layout/layout';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { ucFirst } from '../../utils/common';
import { convertRatingToPercent } from '../../utils/offer';
import Mark from '../../components/mark/mark';
import FavoriteButton from '../../components/favorite-btn/favorite-btn';
import Map from '../../components/map/map';
import Comments from '../../components/comments/comments';
import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getOffer, getOfferStatus } from '../../store/offer-data/selectors';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';
import { fetchCommentsAction, fetchNearOffersAction, fetchOfferAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useParams } from 'react-router-dom';
import { getNearOffers, getNearOffersStatus } from '../../store/near-offers-data/selectors';
import { getComments, getCommentsFetchStatus } from '../../store/comments-data/selectors';
import { getSortedComments } from '../../utils/comment';

function OfferPage(): JSX.Element {
  const offer = useAppSelector(getOffer);
  const offerStatus = useAppSelector(getOfferStatus);

  const nearOffers = useAppSelector(getNearOffers);
  const nearOffersStatus = useAppSelector(getNearOffersStatus);

  const comments = useAppSelector(getComments);
  const sortedComments = getSortedComments(comments);
  const commentsFetchStatus = useAppSelector(getCommentsFetchStatus);

  const dispatch = useAppDispatch();
  const offerId = Number(useParams().id);
  const isLoading = offerStatus.isLoading || nearOffersStatus.isLoading || commentsFetchStatus.isLoading;

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearOffersAction(offerId));
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  if (!offer || isLoading) {
    return <Loader isSmall={false} />;
  }

  const renderedOffers = [...nearOffers, offer];

  return (
    <Layout pageTitle={offer.title}>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <OfferGallery images={offer.images} type={offer.type} />
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {offer.isPremium && <Mark className="property__mark" text="Premium" />}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>

                <FavoriteButton className="property" id={offerId} isFavorite={offer.isFavorite} />

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${convertRatingToPercent(offer.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {ucFirst(offer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <GoodsList goods={offer.goods} />
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={cn('property__avatar-wrapper user__avatar-wrapper', offer.host.isPro && 'property__avatar-wrapper--pro')}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>

                  {offer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}

                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>

              <Comments comments={sortedComments} />

            </div>
          </div>
          <Map className="property" location={offer.city.location} offers={renderedOffers} selectedOfferId={offer.id} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              classNames="near-places__list places__list"
              offers={nearOffers}
              offerCardType={OfferCardType.Offer}
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default OfferPage;

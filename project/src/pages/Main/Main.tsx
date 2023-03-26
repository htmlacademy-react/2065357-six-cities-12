import { useState } from 'react';
import Layout from '../../components/layout/layout';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Sort from '../../components/sort/sort';
import Tabs from '../../components/tabs/tabs';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';

type MainProps = {
  offers: Offer[];
}

function Main({ offers }: MainProps): JSX.Element {
  const [selectedOffer, setSelectedOfferId] = useState<number | null>(null);

  const onCardHover = (offerId: number | null): void => {
    setSelectedOfferId(offerId);
  };

  return (
    <Layout className="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>

              <Sort />

              <OffersList
                offers={offers}
                classNames="cities__places-list places__list"
                offerCardType={OfferCardType.Main}
                onCardHover={onCardHover}
              />

            </section>
            <div className="cities__right-section">
              <Map
                className="cities"
                location={offers[0].city.location}
                offers={offers}
                selectedOfferId={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Main;

import { SortType } from '../const';
import { Offer } from '../types/offer';

const getSortedOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortType.PriceToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortType.Rating:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export { getSortedOffers };

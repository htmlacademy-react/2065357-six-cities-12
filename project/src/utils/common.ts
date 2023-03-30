import { Offer } from '../types/offer';

const ucFirst = (str: string): string => str[0].toUpperCase() + str.slice(1);

const getOffersByCity = (city: string | undefined, offers: Offer[]): Offer[] => offers.filter((offer) => offer.city.name === city);

export { ucFirst, getOffersByCity };

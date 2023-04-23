import { Cities } from '../const';
import { Offer } from '../types/offer';

const ucFirst = (str: string): string => str[0].toUpperCase() + str.slice(1);

const getOffersByCity = (city: string | undefined, offers: Offer[]): Offer[] => offers.filter((offer) => offer.city.name === city);

const getRandomInteger = (min: number, max: number): number => {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomCity = (arr: Cities[]): Cities => arr[getRandomInteger(0, arr.length - 1)];

export { ucFirst, getOffersByCity, getRandomCity };

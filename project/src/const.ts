export enum AppRoute {
  Login = '/login',
  Main = '/',
  Offer = '/offer/:id',
  Favorites = '/favorites',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferCardType {
  Main = 'cities',
  Favorites = 'favorites',
  Offer = 'near-places',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Offer = '/offer/:id',
  Favorites = '/favorites',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
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

export enum SortType {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  Rating = 'Top rated first'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum NameSpace {
  App = 'APP',
  Data = 'DATA',
  Offer = 'OFFER',
  NearOffers = 'NEAR-OFFERS',
  Comments = 'COMMENTS',
  Favorites = 'FAVORITES',
  User = 'USER',
  Notification = 'NOTIFICATION'
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const DEFAULT_CITY = Cities.Paris;
export const DEFAULT_SORT_TYPE = SortType.Popular;

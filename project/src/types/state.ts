import { Offer } from './offer';
import { store } from '../store/index.js';
import { SortType } from '../const';

export type InitialState = {
  city: string;
  offers: Offer[] | undefined;
  sortType: SortType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

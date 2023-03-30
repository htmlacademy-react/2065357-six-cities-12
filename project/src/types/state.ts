import { Offer } from './offer';
import { store } from '../store/index.js';

export type InitialState = {
  city: string | undefined;
  offers: Offer[] | undefined;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

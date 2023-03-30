import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { mockOffers } from '../mocks/offer';
import { InitialState } from '../types/state';
import { getOffersByCity } from '../utils/common';
import { addOffers, changeCity } from './action';

const DEFAULT_CITY = CITIES[0];

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: getOffersByCity(DEFAULT_CITY, mockOffers)
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    });
});

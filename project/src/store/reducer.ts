import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortType } from '../const';
import { mockOffers } from '../mocks/offer';
import { InitialState } from '../types/state';
import { addOffers, changeCity, changeSortType } from './action';

const DEFAULT_CITY = CITIES[0];
const DEFAULT_SORT_TYPE = SortType.Popular;

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: mockOffers,
  sortType: DEFAULT_SORT_TYPE
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

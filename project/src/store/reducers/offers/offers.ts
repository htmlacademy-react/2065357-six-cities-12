import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Offer } from '../../../types/offer';
import { fetchOffersAction, logoutAction, toggleFavoriteAction } from '../../api-actions';

export type OffersSlice = {
  offers: Offer[];
  status: Status;
};

const initialState: OffersSlice = {
  offers: [],
  status: Status.Idle
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.offers.forEach((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }
        });
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.offers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  }
});

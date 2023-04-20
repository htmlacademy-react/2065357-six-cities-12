import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Offer } from '../../../types/offer';
import { fetchOfferAction, logoutAction, toggleFavoriteAction } from '../../api-actions';

export type OfferSlice = {
  offer: Offer | null;
  status: Status;
};

const initialState: OfferSlice = {
  offer: null,
  status: Status.Idle
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        if (state.offer?.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        if (state.offer) {
          state.offer.isFavorite = false;
        }
      });
  }
});

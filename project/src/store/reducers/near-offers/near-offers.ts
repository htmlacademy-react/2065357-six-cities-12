import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Offer } from '../../../types/offer';
import { fetchNearOffersAction, logoutAction, toggleFavoriteAction } from '../../api-actions';

type InitialState = {
  nearOffers: Offer[];
  status: Status;
};

const initialState: InitialState = {
  nearOffers: [],
  status: Status.Idle
};

export const nearOffersData = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        state.nearOffers.forEach((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }
        });
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.nearOffers.forEach((offer) => {
          offer.isFavorite = false;
        });
      });
  }
});

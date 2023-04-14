import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { fetchNearOffersAction } from '../api-actions';

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
      });
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../const';
import { Offer } from '../../types/offer';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
  offers: Offer[];
  status: Status | null;
};

const initialState: InitialState = {
  offers: [],
  status: null
};

const appData = createSlice({
  name: 'fetchOffers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = null;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export default appData.reducer;

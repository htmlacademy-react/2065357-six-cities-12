import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
  offers: Offer[];
  status: Status;
};

const initialState: InitialState = {
  offers: [],
  status: Status.Idle
};

export const offersData = createSlice({
  name: NameSpace.Data,
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
      });
  }
});

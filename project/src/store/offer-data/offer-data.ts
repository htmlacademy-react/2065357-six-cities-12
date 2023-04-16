import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { fetchOfferAction } from '../api-actions';

type InitialState = {
  offer: Offer | null;
  status: Status;
};

const initialState: InitialState = {
  offer: null,
  status: Status.Idle
};

export const offerData = createSlice({
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
      });
  }
});

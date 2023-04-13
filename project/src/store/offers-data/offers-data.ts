import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
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

const offersData = createSlice({
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

export default offersData.reducer;

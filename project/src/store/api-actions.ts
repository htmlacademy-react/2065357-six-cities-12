import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Offer } from '../types/offer';
import { State } from '../types/state';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

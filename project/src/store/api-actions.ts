import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { pushNotification } from './notifications-slice/notifications-slice';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);

      return data;
    } catch {
      throw new Error();
    }
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load offer data' }));
      throw err;
    }
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load near offers data' }));
      throw err;
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(pushNotification({ type: 'success', message: 'Login success' }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Login failed' }));
      throw err;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Logout failed' }));
      throw err;
    }
  },
);

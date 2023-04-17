import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Comment, CommentData } from '../types/comment';
import { FavoriteOfferData, Offer } from '../types/offer';
import { ThunkOptions } from '../types/store';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { pushNotification } from './reducers/notifications/notifications';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, ThunkOptions>(
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

export const fetchOfferAction = createAsyncThunk<Offer, number, ThunkOptions>(
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

export const fetchNearOffersAction = createAsyncThunk<Offer[], number, ThunkOptions>(
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

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, ThunkOptions>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load favorites offers' }));
      throw err;
    }
  }
);

export const toggleFavoriteAction = createAsyncThunk<Offer, FavoriteOfferData, ThunkOptions>(
  'data/toggleFavorite',
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${+isFavorite}`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to add offer to favorites list' }));
      throw err;
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<Comment[], number, ThunkOptions>(
  'data/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load comments' }));
      throw err;
    }
  }
);

export const sendCommentAction = createAsyncThunk<Comment[], CommentData, ThunkOptions>(
  'data/sendComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, { comment, rating });

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to post comment' }));
      throw err;
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkOptions>(
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

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
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

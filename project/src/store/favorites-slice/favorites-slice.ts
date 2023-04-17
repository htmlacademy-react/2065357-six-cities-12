import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { fetchFavoritesAction } from '../api-actions';

type InitialState = {
  favorites: Offer[];
  fetchStatus: Status;
};

const initialState: InitialState = {
  favorites: [],
  fetchStatus: Status.Idle,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.fetchStatus = Status.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.fetchStatus = Status.Error;
      });
  }
});

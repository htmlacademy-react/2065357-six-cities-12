import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Offer } from '../../../types/offer';
import { fetchFavoritesAction, toggleFavoriteAction } from '../../api-actions';

export type FavoritesSlice = {
  favorites: Offer[];
  fetchStatus: Status;
};

const initialState: FavoritesSlice = {
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
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        }
      });
  }
});

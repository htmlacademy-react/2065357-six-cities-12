import { Status } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import { fetchFavoritesAction, toggleFavoriteAction } from '../../api-actions';
import { FavoritesSlice, favoritesSlice } from './favorites';

const favoriteOffers = Array.from({ length: 5 }, makeFakeOffer);

describe('Reducer: favoritesSlice', () => {
  let state: FavoritesSlice;

  beforeEach(() => {
    state = {
      favorites: [],
      fetchStatus: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(favoritesSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchFavoritesAction test', () => {
    it('Should update fetchStatus to "LOADING" if fetchFavoritesAction pending', () => {
      expect(favoritesSlice.reducer(state, { type: fetchFavoritesAction.pending.type }))
        .toEqual({
          ...state,
          fetchStatus: Status.Loading
        });
    });

    it('Should load favorite offers and update fetchStatus to "SUCCESS" if fetchFavoritesAction fulfilled', () => {
      expect(favoritesSlice.reducer(state, { type: fetchFavoritesAction.fulfilled.type, payload: favoriteOffers }))
        .toEqual({
          ...state,
          favorites: favoriteOffers,
          fetchStatus: Status.Success
        });
    });

    it('Should update fetchStatus to "ERROR" if fetchFavoritesAction rejected', () => {
      expect(favoritesSlice.reducer(state, { type: fetchFavoritesAction.rejected.type }))
        .toEqual({
          ...state,
          fetchStatus: Status.Error
        });
    });
  });

  describe('toggleFavoriteAction test', () => {
    it('Should change favorite offers if toggleFavoriteAction fulfilled', () => {
      const favoriteOffer = makeFakeOffer();

      if (favoriteOffer.isFavorite) {
        state.favorites.push(favoriteOffer);
      } else {
        favoriteOffers.filter((offer) => offer.id !== favoriteOffer.id);
      }

      expect(favoritesSlice.reducer(state, { type: toggleFavoriteAction.fulfilled.type, payload: favoriteOffers }))
        .toEqual(state);
    });
  });
});

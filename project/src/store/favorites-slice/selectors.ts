import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/store';

export const getFavorites = (state: State): Offer[] => state[NameSpace.Favorites].favorites;
export const getFetchStatus = (state: State): Status => state[NameSpace.Favorites].fetchStatus;

export const getCommentsFetchStatus = createSelector([getFetchStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
}));

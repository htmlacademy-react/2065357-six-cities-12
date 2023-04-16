import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getNearOffers = (state: State): Offer[] => state[NameSpace.NearOffers].nearOffers;
export const getStatus = (state: State): Status => state[NameSpace.NearOffers].status;

export const getNearOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

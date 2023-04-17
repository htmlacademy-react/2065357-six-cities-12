import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/store';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getStatus = (state: State): Status => state[NameSpace.Data].status;

export const getOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

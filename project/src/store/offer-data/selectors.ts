import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].offer;
export const getStatus = (state: State): Status => state[NameSpace.Offer].status;

export const getOfferStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

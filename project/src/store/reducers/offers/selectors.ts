import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Offer } from '../../../types/offer';
import { State } from '../../../types/store';
import { getOffersByCity } from '../../../utils/common';
import { getSortedOffers } from '../../../utils/sort';
import { getCurrentCity, getCurrentSortType } from '../app/selectors';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getStatus = (state: State): Status => state[NameSpace.Data].status;

export const getOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getFilteredOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => getOffersByCity(city, offers)
);

export const getRenderedOffers = createSelector(
  [getFilteredOffers, getCurrentSortType],
  (offers, sortType) => getSortedOffers(offers, sortType)
);

export const getIsEmpty = createSelector([getRenderedOffers], (offers) => !offers.length);

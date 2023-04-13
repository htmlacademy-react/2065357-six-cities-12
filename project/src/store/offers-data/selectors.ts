import { NameSpace, Status } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getStatus = (state: State): Status | null => state[NameSpace.Data].status;

import { Status } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import { fetchOffersAction } from '../../api-actions';
import { OffersSlice, offersSlice } from './offers';

const offers = Array.from({ length: 5 }, makeFakeOffer);

describe('Reducer: offersSlice', () => {
  let state: OffersSlice;

  beforeEach(() => {
    state = {
      offers: [],
      status: Status.Idle
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(offersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchOffersAction test', () => {
    it('Should update status to "LOADING" if fetchOffersAction pending', () => {
      expect(offersSlice.reducer(state, { type: fetchOffersAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load offers and update status to "SUCCESS" if fetchOffersAction fulfilled', () => {
      expect(offersSlice.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: offers }))
        .toEqual({
          ...state,
          offers: offers,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchOffersAction rejected', () => {
      expect(offersSlice.reducer(state, { type: fetchOffersAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});


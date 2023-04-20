import { Status } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import { fetchNearOffersAction } from '../../api-actions';
import { NearOffersSlice, nearOffersSlice } from './near-offers';

const nearOffers = Array.from({ length: 3 }, makeFakeOffer);

describe('Reducer: nearOffersSlice', () => {
  let state: NearOffersSlice;

  beforeEach(() => {
    state = {
      nearOffers: [],
      status: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(nearOffersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchNearOffersAction test', () => {
    it('Should update status to "LOADING" if fetchNearOffersAction pending', () => {
      expect(nearOffersSlice.reducer(state, { type: fetchNearOffersAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load nearOffers and update status to "SUCCESS" if fetchNearOffersAction fulfilled', () => {
      expect(nearOffersSlice.reducer(state, { type: fetchNearOffersAction.fulfilled.type, payload: nearOffers }))
        .toEqual({
          ...state,
          nearOffers: nearOffers,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" if fetchNearOffersAction rejected', () => {
      expect(nearOffersSlice.reducer(state, { type: fetchNearOffersAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});

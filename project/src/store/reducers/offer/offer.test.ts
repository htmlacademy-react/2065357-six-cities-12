import { Status } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import { fetchOfferAction } from '../../api-actions';
import { OfferSlice, offerSlice } from './offer';

const offer = makeFakeOffer();

describe('Reducer: offerSlice', () => {
  let state: OfferSlice;

  beforeEach(() => {
    state = {
      offer: null,
      status: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(offerSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchOfferAction test', () => {
    it('Should update status to "LOADING" if fetchOfferAction pending', () => {
      expect(offerSlice.reducer(state, { type: fetchOfferAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load offer and update status to "SUCCESS" if fetchOfferAction fulfilled', () => {
      expect(offerSlice.reducer(state, { type: fetchOfferAction.fulfilled.type, payload: offer }))
        .toEqual({
          ...state,
          offer: offer,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchOfferAction rejected', () => {
      expect(offerSlice.reducer(state, { type: fetchOfferAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});


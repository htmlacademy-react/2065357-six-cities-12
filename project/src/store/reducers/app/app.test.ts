import { Cities, DEFAULT_CITY, DEFAULT_SORT_TYPE, SortType } from '../../../const';
import { AppSlice, appSlice, changeCity, changeSortType } from './app';

describe('Reducer: appSlice', () => {
  let state: AppSlice;

  beforeEach(() => {
    state = {
      city: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(appSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should change current city by a given city', () => {
    expect(appSlice.reducer(state, changeCity(Cities.Amsterdam)))
      .toEqual({
        ...state,
        city: Cities.Amsterdam
      });
  });

  it('Should change current sort type by a given sort type', () => {
    expect(appSlice.reducer(state, changeSortType(SortType.PriceToHigh)))
      .toEqual({
        ...state,
        sortType: SortType.PriceToHigh
      });
  });
});

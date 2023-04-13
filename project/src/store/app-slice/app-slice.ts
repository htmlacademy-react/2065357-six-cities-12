import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { CITIES, NameSpace, SortType } from '../../const';

const DEFAULT_CITY = CITIES[0];
const DEFAULT_SORT_TYPE = SortType.Popular;

type InitialState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  sortType: DEFAULT_SORT_TYPE
};

export const AppSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },

    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const {
  changeCity,
  changeSortType
} = AppSlice.actions;

export default AppSlice.reducer;

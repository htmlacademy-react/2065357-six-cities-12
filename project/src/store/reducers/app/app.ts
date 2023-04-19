import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, NameSpace, SortType } from '../../../const';

const DEFAULT_CITY = Cities.Paris;
const DEFAULT_SORT_TYPE = SortType.Popular;

type InitialState = {
  city: Cities;
  sortType: SortType;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  sortType: DEFAULT_SORT_TYPE
};

export const AppSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<Cities>) => {
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

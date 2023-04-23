import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, DEFAULT_CITY, DEFAULT_SORT_TYPE, NameSpace, SortType } from '../../../const';

export type AppSlice = {
  city: Cities;
  sortType: SortType;
}

const initialState: AppSlice = {
  city: DEFAULT_CITY,
  sortType: DEFAULT_SORT_TYPE
};

export const appSlice = createSlice({
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
} = appSlice.actions;

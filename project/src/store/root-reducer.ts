import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { AppSlice } from './app-slice/app-slice';
import { offersData } from './offers-data/offers-data';
import { userSlice } from './user-slice/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: AppSlice.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userSlice.reducer
});

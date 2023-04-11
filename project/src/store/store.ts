import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { redirect } from './middleware/redirect';
import { createAPI } from '../services/api';
import appReducer from './app-slice/app-slice';
import offersData from './offers-data/offers-data';
import userReducer from './user-slice/user-slice';

export const rootReducer = combineReducers({
  appReducer,
  offersData,
  userReducer
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect),
});

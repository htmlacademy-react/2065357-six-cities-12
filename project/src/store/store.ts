import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offerReducer from './app-slice/app-slice';
import appData from './offers-data/offers-data';

export const rootReducer = combineReducers({
  offerReducer,
  appData
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }),
});

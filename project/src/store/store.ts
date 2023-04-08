import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offerReducer from './offer-slice/offer-slice';
import appData from './app-data/app-data';

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

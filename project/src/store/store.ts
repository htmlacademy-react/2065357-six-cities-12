import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offerReducer from './reducers/offer-slice';

export const rootReducer = combineReducers({
  offerReducer
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

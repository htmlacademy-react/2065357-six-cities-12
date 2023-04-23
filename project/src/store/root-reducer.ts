import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appSlice } from './reducers/app/app';
import { commentsSlice } from './reducers/comments/comments';
import { favoritesSlice } from './reducers/favorites/favorites';
import { nearOffersSlice } from './reducers/near-offers/near-offers';
import { notificationsSlice } from './reducers/notifications/notifications';
import { offerSlice } from './reducers/offer/offer';
import { offersSlice } from './reducers/offers/offers';
import { userSlice } from './reducers/user/user';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.NearOffers]: nearOffersSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Favorites]: favoritesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer
});

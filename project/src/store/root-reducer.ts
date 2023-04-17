import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { AppSlice } from './reducers/app/app';
import { commentsData } from './reducers/comments/comments';
import { favoritesSlice } from './reducers/favorites/favorites';
import { nearOffersData } from './reducers/near-offers/near-offers';
import { notificationsSlice } from './reducers/notifications/notifications';
import { offerData } from './reducers/offer/offer';
import { offersData } from './reducers/offers/offers';
import { userSlice } from './reducers/user/user';

export const rootReducer = combineReducers({
  [NameSpace.App]: AppSlice.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.NearOffers]: nearOffersData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Favorites]: favoritesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer
});

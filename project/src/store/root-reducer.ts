import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { AppSlice } from './app-slice/app-slice';
import { commentsData } from './comments-data/comments-data';
import { favoritesSlice } from './favorites-slice/favorites-slice';
import { nearOffersData } from './near-offers-data/near-offers-data';
import { notificationsSlice } from './notifications-slice/notifications-slice';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { userSlice } from './user-slice/user-slice';

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

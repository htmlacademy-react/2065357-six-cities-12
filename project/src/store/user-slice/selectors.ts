import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Status } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLogin = (state: State): string => state[NameSpace.User].login;
export const getAvatarUrl = (state: State): string => state[NameSpace.User].avatarUrl;
export const getStatus = (state: State): Status => state[NameSpace.User].status;

export const getLoginStatus = createSelector([getStatus], (status) => ({
  isLoading: status === Status.Loading
}));

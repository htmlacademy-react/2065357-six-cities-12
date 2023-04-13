import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLogin = (state: State): string => state[NameSpace.User].login;
export const getAvatarUrl = (state: State): string => state[NameSpace.User].avatarUrl;

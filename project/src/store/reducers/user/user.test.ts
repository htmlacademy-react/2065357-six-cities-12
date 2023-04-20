import { AuthorizationStatus, Status } from '../../../const';
import { makeFakeUserData } from '../../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';
import { UserSlice, userSlice } from './user';

const userData = makeFakeUserData();

describe('Reducer: userSlice', () => {
  let state: UserSlice;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      login: '',
      avatarUrl: '',
      status: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('Should update authorizationStatus to "AUTH", login and avatarUrl if checkAuthAction fulfilled', () => {
      expect(userSlice.reducer(state, { type: checkAuthAction.fulfilled.type, payload: userData }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.Auth,
          login: userData.email,
          avatarUrl: userData.avatarUrl
        });
    });
    it('Should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userSlice.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth
        });
    });
  });

  describe('loginAction test', () => {
    it('should update status to "LOADING" if loginAction pending', () => {
      expect(userSlice.reducer(state, { type: loginAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });
    it('should update authorizationStatus to "AUTH", status to "SUCCESS", login and avatarUrl if loginAction fulfilled', () => {
      expect(userSlice.reducer(state, { type: loginAction.fulfilled.type, payload: userData }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.Auth,
          login: userData.email,
          avatarUrl: userData.avatarUrl,
          status: Status.Success
        });
    });
    it('should update authorizationStatus to "NO_AUTH" and status to "ERROR" if loginAction rejected', () => {
      expect(userSlice.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth,
          status: Status.Error
        });
    });
  });

  describe('logoutAction test', () => {
    it('Should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userSlice.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth
        });
    });
  });
});


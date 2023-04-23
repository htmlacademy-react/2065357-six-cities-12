import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Status } from '../../../const';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';

export type UserSlice = {
  authorizationStatus: AuthorizationStatus;
  login: string;
  avatarUrl: string;
  status: Status;
};

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  login: '',
  avatarUrl: '',
  status: Status.Idle
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.login = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.login = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
        state.status = Status.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.status = Status.Error;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

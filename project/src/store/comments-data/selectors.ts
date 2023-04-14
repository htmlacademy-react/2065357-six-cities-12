import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Comment } from '../../types/comment';
import { State } from '../../types/state';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getStatus = (state: State): Status => state[NameSpace.Comments].status;

export const getCommentsStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

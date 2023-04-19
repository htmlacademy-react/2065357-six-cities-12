import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Comment } from '../../../types/comment';
import { State } from '../../../types/store';
import { getSortedComments } from '../../../utils/comment';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getFetchStatus = (state: State): Status => state[NameSpace.Comments].fetchStatus;
export const getPostStatus = (state: State): Status => state[NameSpace.Comments].postStatus;

export const getCommentsFetchStatus = createSelector([getFetchStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
}));

export const getPostCommentStatus = createSelector([getPostStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getRenderedComments = createSelector([getComments], (comments) => getSortedComments(comments));

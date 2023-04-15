import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Comment } from '../../types/comment';
import { fetchCommentsAction, sendCommentAction } from '../api-actions';

type InitialState = {
  comments: Comment[];
  fetchStatus: Status;
  postStatus: Status;
};

const initialState: InitialState = {
  comments: [],
  fetchStatus: Status.Idle,
  postStatus: Status.Idle
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.fetchStatus = Status.Success;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.fetchStatus = Status.Error;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.postStatus = Status.Loading;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.postStatus = Status.Success;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.postStatus = Status.Error;
      });
  }
});

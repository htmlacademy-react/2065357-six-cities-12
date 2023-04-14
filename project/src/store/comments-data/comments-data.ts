import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Comment } from '../../types/comment';
import { fetchCommentsAction } from '../api-actions';

type InitialState = {
  comments: Comment[];
  status: Status;
};

const initialState: InitialState = {
  comments: [],
  status: Status.Idle
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

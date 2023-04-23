import { Status } from '../../../const';
import { makeFakeComment } from '../../../utils/mocks';
import { fetchCommentsAction, sendCommentAction } from '../../api-actions';
import { CommentSlice, commentsSlice } from './comments';

const comments = [makeFakeComment()];

describe('Reducer: commentsSlice', () => {
  let state: CommentSlice;

  beforeEach(() => {
    state = {
      comments: [],
      fetchStatus: Status.Idle,
      postStatus: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(commentsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCommentsAction test', () => {
    it('Should update fetchStatus to "LOADING" if fetchCommentsAction pending', () => {
      expect(commentsSlice.reducer(state, { type: fetchCommentsAction.pending.type }))
        .toEqual({
          ...state,
          fetchStatus: Status.Loading
        });
    });

    it('Should load comments and update fetchStatus to "SUCCESS" if fetchCommentsAction fulfilled', () => {
      expect(commentsSlice.reducer(state, { type: fetchCommentsAction.fulfilled.type, payload: comments }))
        .toEqual({
          ...state,
          comments: comments,
          fetchStatus: Status.Success
        });
    });

    it('Should update fetchStatus to "ERROR" if fetchCommentsAction rejected', () => {
      expect(commentsSlice.reducer(state, { type: fetchCommentsAction.rejected.type }))
        .toEqual({
          ...state,
          fetchStatus: Status.Error
        });
    });
  });

  describe('sendCommentAction test', () => {
    it('Should update postStatus is sendCommentAction pending', () => {
      expect(commentsSlice.reducer(state, { type: sendCommentAction.pending.type }))
        .toEqual({
          ...state,
          postStatus: Status.Loading
        });
    });

    it('Should update comments and postStatus is sendCommentAction fulfilled', () => {
      expect(commentsSlice.reducer(state, { type: sendCommentAction.fulfilled.type, payload: comments }))
        .toEqual({
          ...state,
          comments: comments,
          postStatus: Status.Success
        });
    });

    it('Should update postStatus is sendCommentAction rejected', () => {
      expect(commentsSlice.reducer(state, { type: sendCommentAction.rejected.type }))
        .toEqual({
          ...state,
          postStatus: Status.Error
        });
    });
  });
});

import { Comment } from '../../types/comment';
import CommentItem from '../comment-item/comment-item';

type CommentsListProp = {
  comments: Comment[];
}

function CommentsList({ comments }: CommentsListProp): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)}
    </ul>
  );
}

export default CommentsList;

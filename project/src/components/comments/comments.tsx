import { Comment } from '../../types/comment';
import CommentsList from '../comments-list/comments-list';
import PostCommentForm from '../post-comment-form/post-comment-form';

type CommentsProp = {
  comments: Comment[];
}

function Comments({ comments }: CommentsProp): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <CommentsList comments={comments} />
      <PostCommentForm />
    </section>
  );
}

export default Comments;

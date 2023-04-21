import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getAuthStatus } from '../../store/reducers/user/selectors';
import { Comment } from '../../types/comment';
import { getRenderedComments } from '../../utils/comment';
import CommentsList from '../comments-list/comments-list';
import CommentForm from '../comment-form/comment-form';

const MAX_COMMENTS_COUNT = 10;

type CommentsProp = {
  comments: Comment[];
}

function Comments({ comments }: CommentsProp): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const renderedComments = getRenderedComments(comments, MAX_COMMENTS_COUNT);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <CommentsList comments={renderedComments} />
      {authorizationStatus.isAuth && <CommentForm />}
    </section>
  );
}

export default Comments;

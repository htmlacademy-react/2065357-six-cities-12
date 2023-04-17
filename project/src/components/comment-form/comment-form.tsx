import { Fragment, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { sendCommentAction } from '../../store/api-actions';
import { getPostCommentStatus } from '../../store/comments-data/selectors';
import Loader from '../loader/loader';

const RATING_TITLES = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

const MIN_AMOUNT_SYMBOLS = 50;
const MAX_AMOUNT_SYMBOLS = 300;

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: ''
  });
  const postCommentStatus = useAppSelector(getPostCommentStatus);
  const dispatch = useAppDispatch();
  const offerId = Number(useParams().id);

  const isDisabledButton = MIN_AMOUNT_SYMBOLS < formData.review.length || formData.review.length < MAX_AMOUNT_SYMBOLS || !+formData.rating || postCommentStatus.isLoading;

  useEffect(() => {
    if (postCommentStatus.isSuccess) {
      setFormData((prev) => ({ ...prev, rating: '0', review: '' }));
    }
  }, [postCommentStatus]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(sendCommentAction({
      id: offerId,
      comment: formData.review,
      rating: +formData.rating
    }));
  };

  return (
    <form
      className="reviews__form form"
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map((rating, i) => {
          const reversedIndex = RATING_TITLES.length - i;

          return (
            <Fragment key={rating}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={reversedIndex}
                id={`${reversedIndex}-stars`}
                type="radio"
                checked={+formData.rating === reversedIndex}
                onChange={handleChange}
                disabled={postCommentStatus.isLoading}
              />
              <label
                htmlFor={`${reversedIndex}-stars`}
                className="reviews__rating-label form__rating-label"
                title={rating}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>);
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleChange}
        disabled={postCommentStatus.isLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star"></span>
          and describe your stay with at least
          <b className="reviews__text-amount"> {MIN_AMOUNT_SYMBOLS} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledButton}
        >
          {postCommentStatus.isLoading ? <Loader /> : 'Submit'}
        </button>
      </div>
    </form >
  );
}

export default CommentForm;

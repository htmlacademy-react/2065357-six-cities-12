import { Fragment, useState, ChangeEvent } from 'react';

const RATING_TITLES = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

function PostCommentForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: ''
  });

  const formDataChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
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
                onChange={formDataChangeHandler}
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
        onChange={formDataChangeHandler}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form >
  );
}

export default PostCommentForm;

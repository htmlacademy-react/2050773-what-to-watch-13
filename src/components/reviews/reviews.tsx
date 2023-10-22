import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchReviewsAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getReviews } from '../../store/reviews-process/reviews-process.selectors';
import { getDataFormat } from '../../utils/utils';
import { DateFormat } from '../../const';
import { getReviewsErrorStatus } from '../../store/reviews-process/reviews-process.selectors';
import ErrorMessage from '../error-message/error-message';

function Reviews(): JSX.Element {

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const hasError = useAppSelector(getReviewsErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  const firstHalfReviews = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondHalfReviews = reviews.slice(Math.ceil(reviews.length / 2));

  if (hasError) {
    return <ErrorMessage />;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfReviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{review.user}</cite>
                <time className="review__date" dateTime={getDataFormat(review.date, DateFormat.DATE_TIME_FORMAT)}>{getDataFormat(review.date, DateFormat.REVIEW_DATE_FORMAT)}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>

      <div className="film-card__reviews-col">
        {secondHalfReviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{review.user}</cite>
                <time className="review__date" dateTime={getDataFormat(review.date, DateFormat.DATE_TIME_FORMAT)}>{getDataFormat(review.date, DateFormat.REVIEW_DATE_FORMAT)}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;

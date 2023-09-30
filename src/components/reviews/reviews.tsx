import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchReviewsAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function Reviews(): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);


  const firstHalfReviews = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondHalfReviews = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfReviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{review.user}</cite>
                <time className="review__date" dateTime={new Date(review.date).toISOString()}>
                  {new Date(review.date).toLocaleDateString()}
                </time>
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
                <time className="review__date" dateTime={new Date(review.date).toISOString()}>
                  {new Date(review.date).toLocaleDateString()}
                </time>
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

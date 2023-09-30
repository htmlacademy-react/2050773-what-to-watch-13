import { useState } from 'react';
import React from 'react';
import { useAppDispatch } from '../../hooks/index';
import { TReview } from '../../types/review';
import { FormEvent } from 'react';
import { fetchSendCommentAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { APIRoute } from '../../const';


type AddReviewProps = {
  id: string;
}

function AddReview({id}: AddReviewProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const { rating, comment } = Object.fromEntries(formData) as unknown as TReview;
    const ratingNumber = Number(rating);

    const isValidReviewText = comment.length >= 50 && comment.length <= 400;
    const isFormValid = rating && isValidReviewText;

    if (!isFormValid) {
      setErrorMessage('Ooops, you better check your rating or text!');
      return;
    }

    setIsFormDisabled(true);
    setErrorMessage(null);

    // Now, dispatch the action and handle the Promise inside the handler without making it async
    dispatch(fetchSendCommentAction({ rating: ratingNumber, comment, filmId: id }))
      .then(() => {
        navigate(`${APIRoute.Films}/${id}`);
      })
      .catch(() => {
        setIsFormDisabled(false);
        setErrorMessage('There was an error submitting your review. Please try again.');
      });
  };


  return(
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              Array.from({length: 10}, (_, i) => 10 - i).map((num) => (
                <React.Fragment key={num}>
                  <input className='rating__input'
                    id={`star-${num}`}
                    type='radio'
                    name='rating'
                    value={num.toString()}
                    key={num}
                  />
                  <label className='rating__label' htmlFor={`star-${num}`}> Rating {num}</label>
                </React.Fragment>
              ))
            }
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="comment"
            id="review-text"
            placeholder="Review text"
          >
          </textarea>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isFormDisabled}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReview;

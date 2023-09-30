import { useState } from 'react';

function AddReview(): JSX.Element {

  const [rating, setRating] = useState<string>('8');
  const [review, setReview] = useState<string>('');

  // console.log(rating, review);

  return(
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {
              Array.from({length: 10}, (_, i) => 10 - i).map((num) => (
                <div key={num}>
                  <input className='rating__input'
                    id={`star-${num}`}
                    type='radio'
                    name='rating'
                    value={num.toString()}
                    checked={rating === num.toString()}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label className='rating__label' htmlFor={`star-${num}`}> Rating {num}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReview;

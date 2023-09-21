import { TFilms } from '../../types/films';

type OverViewProps = {
  film: TFilms;
}

function Overview({film}: OverViewProps): JSX.Element {
  const { rating, scoresCount, description, director, starring } = film;
  const formattedStarring = starring.join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>Director: {director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {formattedStarring}, and other</strong></p>
      </div>
    </>
  );
}

export default Overview;

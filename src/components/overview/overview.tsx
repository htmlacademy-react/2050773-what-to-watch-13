import { TFilm } from '../../types/films';

type OverViewProps = {
  film: TFilm;
}

function Overview({film}: OverViewProps): JSX.Element {
  const { rating, scoresCount, description, director, starring } = film;
  const formattedStarring = starring.join(', ');

  function getRatingLevel(rate: number): string {
    if (rate === 10) {
      return 'Awesome';
    }
    if (rate >= 8) {
      return 'Very good';
    }
    if (rate >= 5) {
      return 'Good';
    }
    if (rate >= 3) {
      return 'Normal';
    }
    return 'Bad';
  }


  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(rating)}</span>
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

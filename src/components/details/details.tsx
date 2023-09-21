import { TFilms } from '../../types/films';

type DetailsProps = {
  film: TFilms;
}

function Details({film}: DetailsProps): JSX.Element {
  const { released, genre, director, runTime } = film;
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
              Bill Murray, <br/>
              Edward Norton, <br/>
              Jude Law, <br/>
              Willem Dafoe, <br/>
              Saoirse Ronan, <br/>
              Tony Revoloru, <br/>
              Tilda Swinton, <br/>
              Tom Wilkinson, <br/>
              Owen Wilkinson, <br/>
              Adrien Brody, <br/>
              Ralph Fiennes, <br/>
              Jeff Goldblum
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{hours}h {minutes}m</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;

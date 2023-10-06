import { TPromo } from '../../types/films';
import VideoPlayButton from '../../components/video-play-button/video-play-button';


type PromoProps = {
  promoFilm: TPromo;
};

function Promo({promoFilm}: PromoProps): JSX.Element {

  const {id, name, posterImage, backgroundImage, genre, released } = promoFilm;

  return(

    <>
      <div className="film-card__bg">
        <img src={backgroundImage} alt="The Grand Budapest Hotel" />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <VideoPlayButton id={id} />

              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">9</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promo;

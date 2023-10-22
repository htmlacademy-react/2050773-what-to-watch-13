import { TPromo } from '../../types/films';
import VideoPlayButton from '../../components/video-play-button/video-play-button';
import { memo } from 'react';
import MyListButton from '../my-list-button/my-list-button';


type PromoProps = {
  promoFilm: TPromo;
};

function PromoRaw({promoFilm}: PromoProps): JSX.Element {

  const {id, name, posterImage, backgroundImage, genre, released, isFavorite } = promoFilm;


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
              <MyListButton filmId={id} isFavorite={isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Promo = memo(PromoRaw);

export default Promo;

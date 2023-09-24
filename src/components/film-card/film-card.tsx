import { useState, useEffect } from 'react';
import { TFilmSmallCard } from '../../types/films';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: TFilmSmallCard;
};

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const { name, id, previewImage, previewVideoLink } = film;

  const [isFilmMouseOver, setFilmMouseOver] = useState<boolean>(false);
  const [isSelectedFilm, setSelectedFilm] = useState<boolean>(false);

  useEffect(() => {
    if (isFilmMouseOver) {
      const timer = setTimeout(() => setSelectedFilm(true), 1000);

      return () => {
        clearTimeout(timer);
        setSelectedFilm(false);
      };
    }
  }, [isFilmMouseOver]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setFilmMouseOver(true)}
      onMouseLeave={() => setFilmMouseOver(false)}
    >
      {
        isSelectedFilm ?
          <VideoPlayer src={previewVideoLink} poster={previewImage} /> :
          <>
            <div className="small-film-card__image">
              <img src={previewImage} alt={name} width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
            </h3>
          </>
      }
    </article>
  );
}

export default FilmCard;

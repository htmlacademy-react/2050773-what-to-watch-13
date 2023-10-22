import { useState, useEffect } from 'react';
import { TFilmSmallCard } from '../../types/films';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useNavigate } from 'react-router-dom';

type FilmCardProps = {
  film: TFilmSmallCard;
  onHover?: (film: TFilmSmallCard) => void;
  onLeave?: () => void;
};

function FilmCard({ film, onHover, onLeave }: FilmCardProps): JSX.Element {
  const { name, id, previewImage, previewVideoLink } = film;
  const navigate = useNavigate();


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

  const handleArticleClick = () => {
    if (!isSelectedFilm) {
      navigate(`/films/${id}`);
    }
  };

  const handleMouseEnter = () => {
    setFilmMouseOver(true);
    if (onHover) {
      onHover(film);
    }
  };

  const handleMouseLeave = () => {
    setFilmMouseOver(false);
    if (onLeave) {
      onLeave();
    }
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleArticleClick}

    >
      {
        isSelectedFilm ?
          <VideoPlayer src={previewVideoLink} poster={previewImage} /> :
          <>
            <div className="small-film-card__image">
              <Link className="small-film-card__link" to={`/films/${id}`}>
                <img src={previewImage} alt={name} width="280" height="175" />
              </Link>
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

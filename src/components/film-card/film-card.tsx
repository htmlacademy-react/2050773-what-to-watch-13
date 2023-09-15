import { TFilms } from '../../types/films';

type FilmCardProps = {
  film: TFilms;
  onHover: (film: TFilms) => void;
  onLeave: () => void;
}

function FilmCard({film, onHover, onLeave}: FilmCardProps): JSX.Element{
  const { name } = film;
  return(
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => onHover(film)}
      onMouseLeave={onLeave}
    >
      <div className="small-film-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;


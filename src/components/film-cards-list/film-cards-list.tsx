import { TFilmSmallCards } from '../../types/films';
import FilmCard from '../film-card/film-card';


type FilmCardsListProps = {
  films: TFilmSmallCards;
};

function FilmCardsList({films}: FilmCardsListProps): JSX.Element {


  return(
    <div className="catalog__films-list">
      {films.map((film) =>
        <FilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmCardsList;

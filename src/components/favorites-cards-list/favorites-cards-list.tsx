import { TFilmSmallCards } from '../../types/films';
import FilmCard from '../film-card/film-card';

type FavoritesCardsListProps = {
    films: TFilmSmallCards;
}

function FavoritesCardsList({films}: FavoritesCardsListProps): JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <div className="catalog__films-list">
        {films.map((favorite) => <FilmCard key={favorite.id} film={favorite} />)}
      </div>
    </section>
  );
}

export default FavoritesCardsList;

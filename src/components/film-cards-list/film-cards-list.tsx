import { TFilms } from '../../types/films';
import FilmCard from '../film-card/film-card';
import { useState } from 'react';

type FilmCardsListProps = {
  films: TFilms[];
};

function FilmCardsList({films}: FilmCardsListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<TFilms | null>(null);

  return(
    <div className="catalog__films-list">
      {films.map((film) =>
        <FilmCard key={film.id} film={film} onHover={setActiveCard} onLeave={() => setActiveCard(null)} />)}
    </div>
  );
}

export default FilmCardsList;

import { TFilmSmallCards, TFilmSmallCard } from '../../types/films';
import FilmCard from '../film-card/film-card';
import { useState } from 'react';


type FilmCardsListProps = {
  films: TFilmSmallCards;
};

function FilmCardsList({films}: FilmCardsListProps): JSX.Element {

  const [, setActiveCard] = useState<TFilmSmallCard | null>(null);

  return(
    <div className="catalog__films-list">
      {films.map((film) =>
        <FilmCard key={film.id} film={film} onHover={setActiveCard} onLeave={() => setActiveCard(null)} />)}
    </div>
  );
}

export default FilmCardsList;

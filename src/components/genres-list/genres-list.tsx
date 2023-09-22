import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeGenre, fillFilmsList } from '../../store/action';
import { TFilms } from '../../types/films';

type GenresListProps = {
  genres: string[];
  films: TFilms[];
}

function GenresList({genres, films}: GenresListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleGenreCheck = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(fillFilmsList({films}));
  };

  const activeGenre = useAppSelector((state) => state.genre);
  // console.log(activeGenre);

  return (
    <ul className="catalog__genres-list">
      {genres && genres.map((genre) => (
        <li
          key={genre}
          className={classNames('catalog__genres-item', { 'catalog__genres-item--active': genre === activeGenre })}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              handleGenreCheck(genre);
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;

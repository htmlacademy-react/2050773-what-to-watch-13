import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeGenre, fillFilmsList, resetDisplayFilmsCount } from '../../store/action';
import { TFilmSmallCards} from '../../types/films';

type GenresListProps = {
  genres: string[];
  films: TFilmSmallCards;
}

function GenresList({genres, films}: GenresListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleGenreChange = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(fillFilmsList({films}));
    dispatch(resetDisplayFilmsCount()); //сбрасывает счетчик до 8 каждый раз когда меняю жанр
  };

  const activeGenre = useAppSelector((state) => state.genre);

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
              handleGenreChange(genre);
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

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeGenre, resetDisplayFilmsCount } from '../../store/films-process/films-process.slice';
import { getGenre } from '../../store/films-process/films-process.selectors';

type GenresListProps = {
  genres: string[];
}

function GenresList({genres}: GenresListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getGenre);


  const handleGenreChange = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(resetDisplayFilmsCount()); //сбрасывает счетчик до 8 каждый раз когда меняю жанр
  };


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

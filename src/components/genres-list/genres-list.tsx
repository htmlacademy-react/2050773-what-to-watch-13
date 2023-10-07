import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeGenre } from '../../store/app-process/app-process.slice';
import { getGenre } from '../../store/app-process/app-process.selectors';

type GenresListProps = {
  genres: string[];
  onGenreChange: () => void;
}

function GenresList({genres, onGenreChange}: GenresListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getGenre);


  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre(genre));
    onGenreChange(); //сбрасывает счетчик до 8 каждый раз когда меняю жанр
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
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;

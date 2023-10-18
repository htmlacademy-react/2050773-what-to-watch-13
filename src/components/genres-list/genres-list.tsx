import classNames from 'classnames';

type GenresListProps = {
  genres: string[];
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

function GenresList({genres, currentGenre, onGenreChange}: GenresListProps): JSX.Element {


  const handleGenreClick = (genre: string) => {
    onGenreChange(genre);
  };


  return (
    <ul className="catalog__genres-list">
      {genres && genres.map((genre) => (
        <li
          key={genre}
          className={classNames('catalog__genres-item', { 'catalog__genres-item--active': genre === currentGenre })}
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

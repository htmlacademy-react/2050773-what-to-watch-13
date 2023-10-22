import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { TFilmSmallCards } from '../../types/films';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks/index';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect, useState } from 'react';
import Promo from '../../components/promo/promo';
import { getPromo } from '../../store/films-data/films-data.selectors';
import { useAppDispatch } from '../../hooks/index';
import { fetchPromoFilmAction } from '../../store/api-actions';
import PlayerScreen from '../player-screen/player-screen';
import { DISPLAYED_FILMS_COUNT, DEFAULT_GENRE } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import { getGenres, getFilmsByGenre } from '../../utils/utils';
import { useMemo } from 'react';


type WelcomeScreenProps = {
  filmsSmallCards: TFilmSmallCards;
}

function WelcomeScreen({filmsSmallCards}: WelcomeScreenProps): JSX.Element {

  const promoFilm = useAppSelector(getPromo);
  const dispatch = useAppDispatch();
  const [isPlaying] = useState(false);
  const [displayedFilmsCount, setDisplayedFilmsCount] = useState(DISPLAYED_FILMS_COUNT);
  const [currentGenre, setCurrentGenre] = useState(DEFAULT_GENRE);

  const genres = useMemo(() => getGenres(filmsSmallCards), [filmsSmallCards]);
  const allFilmsByCurrentGenre = useMemo(() => getFilmsByGenre(filmsSmallCards, currentGenre), [filmsSmallCards, currentGenre]);

  useEffect(() => {
    if (!promoFilm) {
      dispatch(fetchPromoFilmAction());
    }
  }, [dispatch, promoFilm]);


  const handleShowMoreButtonClick = () => {
    setDisplayedFilmsCount((prevCount) => prevCount + DISPLAYED_FILMS_COUNT);
  };

  const handleGenreChange = (genre: string) => {
    setCurrentGenre(genre);
    setDisplayedFilmsCount(DISPLAYED_FILMS_COUNT);
  };

  const filmsToShow = allFilmsByCurrentGenre.slice(0, displayedFilmsCount);

  if (!promoFilm) {
    return <LoadingScreen />;
  }

  if (isPlaying && promoFilm) {
    return <PlayerScreen />;
  }

  return(
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW. Welcome!</title>
        </Helmet>
        <Header />
        <Promo promoFilm={promoFilm} />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={genres} currentGenre={currentGenre} onGenreChange={handleGenreChange} />
          {!isPlaying && <FilmCardsList films={filmsToShow} />}
          {filmsToShow.length < allFilmsByCurrentGenre.length
            ? <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick} />
            : null }
        </section>

        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;

import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { TFilmSmallCards } from '../../types/films';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks/index';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect, useState } from 'react';
import { GenresNamespace } from '../../const';
import Promo from '../../components/promo/promo';
import { getGenre } from '../../store/films-process/films-process.selectors';
import { resetDisplayFilmsCount, increaseDisplayFilmsCount } from '../../store/films-process/films-process.slice';
import { getDisplayedFilmsCount } from '../../store/films-process/films-process.selectors';
import { getPromo } from '../../store/film-data/film-data.selectors';
import { useAppDispatch } from '../../hooks/index';
import { fetchPromoFilmAction } from '../../store/api-actions';
import PlayerFullScreen from '../../components/player-full-screen/player-full-screen';

type WelcomeScreenProps = {
  filmsSmallCards: TFilmSmallCards;
  genres: string[];
}

function WelcomeScreen({filmsSmallCards, genres}: WelcomeScreenProps): JSX.Element {

  const currentGenre = useAppSelector(getGenre);
  const filmsByCurrentGenre = currentGenre === 'All genres' ? filmsSmallCards : filmsSmallCards.filter((filmItem) => filmItem.genre === GenresNamespace[currentGenre as keyof typeof GenresNamespace]);
  const promoFilm = useAppSelector(getPromo);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!promoFilm) {
      dispatch(fetchPromoFilmAction());
    }
  }, [dispatch, promoFilm]);


  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLink, setVideoLink] = useState<string | null>(null);


  const handlePlayClick = (link: string) => {
    setVideoLink(link);
    setIsPlaying(true);
  };


  useEffect(() => {
    dispatch(resetDisplayFilmsCount());
  }, [dispatch]); //сбрасывает счетчик до 8 каждый раз когда возвращаюсь на WelcomeScreen


  const handleShowMoreButtonClick = () => {
    dispatch(increaseDisplayFilmsCount());
  };

  const displayedFilmsCount = useAppSelector(getDisplayedFilmsCount);
  const filmsShowed = filmsByCurrentGenre.slice(0, displayedFilmsCount);

  if (!promoFilm) {
    return <p>Loading...</p>;
  }


  if (isPlaying && videoLink) {
    return (
      <PlayerFullScreen onExit={() => setIsPlaying(false)} videoLink={videoLink} />
    );
  }

  return(
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW. Welcome!</title>
        </Helmet>

        <Header />

        <Promo promoFilm={promoFilm} onPlay={handlePlayClick} />


      </section>
      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={genres} films={filmsSmallCards} />
          {!isPlaying && <FilmCardsList films={filmsShowed} />}
        </section>

        {filmsByCurrentGenre.length > displayedFilmsCount ? <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick} /> : null}

        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;

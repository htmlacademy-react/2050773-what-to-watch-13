import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { TFilms } from '../../types/films';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks/index';

type WelcomeScreenProps = {
  films: TFilms[];
  genres: string[];
}

function WelcomeScreen({films, genres}: WelcomeScreenProps): JSX.Element {
  const currentGenre = useAppSelector((state) => state.genre);

  const filmsByCurrentGenre = currentGenre === 'All genres' ? films : films.filter((filmItem) => filmItem.genre === currentGenre);

  return(
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW. Welcome!</title>
        </Helmet>

        <Header backgroundImage="img/bg-the-grand-budapest-hotel.jpg" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={genres} films={films} />

          <FilmCardsList films={filmsByCurrentGenre} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;

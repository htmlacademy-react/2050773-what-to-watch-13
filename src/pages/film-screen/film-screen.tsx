import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { TFilm, TFilms } from '../../types/films';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';
import { TTab } from '../../types/tabs';
import { TReview } from '../../types/review';
import { useSearchParams } from 'react-router-dom';
import { TABS } from '../../const';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/index';
import { useEffect } from 'react';
import { fetchFilmByIdAction } from '../../store/api-actions';

type FilmCardProps = {
  reviews: TReview[];
  films: TFilms;
};


function FilmScreen({ reviews, films}: FilmCardProps): JSX.Element {
  const {id} = useParams();
  const dispatch = useDispatch();

  // console.log(fetchFilmByIdAction(id));


  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  const film = useAppSelector((state) => state.film);

  const { name, genre, released } = film;

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || TABS.OVERVIEW;

  const handleTabClick = (tab: TTab) => {
    setSearchParams({ tab });
  };


  return(
    <>
      <section className="film-card film-card--full">
        <Helmet>
          <title> WTW. Film</title>
        </Helmet>
        <div className="film-card__hero">

          <Header backgroundImage="img/bg-the-grand-budapest-hotel.jpg" />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
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
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs activeTab={activeTab} onTabClick={handleTabClick} film={film} reviews={reviews} />
            </div>

          </div>
        </div>
      </section>
      <div className="page-content">

        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmCardsList films={films} />
        </section>

        <Footer />
      </div>
    </>


  );
}

export default FilmScreen;

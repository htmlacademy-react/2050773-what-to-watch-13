import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';
import { TTab } from '../../types/tabs';
import { useSearchParams } from 'react-router-dom';
import { TABS } from '../../const';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { useEffect } from 'react';
import { fetchFilmByIdAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus, MAX_SIMILAR_FILMS_COUNT } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { isFilmDataLoading, getFilm, getFilmErrorStatus } from '../../store/films-data/films-data.selectors';
import VideoPlayButton from '../../components/video-play-button/video-play-button';
import { getSimilarFilms } from '../../store/films-data/films-data.selectors';
import MyListButton from '../../components/my-list-button/my-list-button';


function FilmScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [id, dispatch]);


  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(isFilmDataLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, MAX_SIMILAR_FILMS_COUNT);
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasFilmError = useAppSelector(getFilmErrorStatus);
  const isAuthorized = currentAuthorizationStatus === AuthorizationStatus.Auth;


  if (isFilmLoading && !hasFilmError) {
    return(<LoadingScreen />
    );
  }

  if (!film) {
    return <NotFoundScreen />;
  }

  const { name, genre, released, backgroundImage, backgroundColor, posterImage, isFavorite } = film;

  const handleAddReviewClick = () => {
    navigate(`/films/${film.id}/review`, { state: { film } });
  };

  const activeTab = searchParams.get('tab') || TABS.OVERVIEW;

  const handleTabClick = (tab: TTab) => {
    setSearchParams({ tab });
  };


  return(
    <>
      <section className="film-card film-card--full" style={{background: backgroundColor}}>
        <Helmet>
          <title> WTW. Film</title>
        </Helmet>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                {id && <VideoPlayButton id={id} />}

                <MyListButton filmId={film.id} isFavorite={isFavorite} isAuthorized={isAuthorized} />

                { currentAuthorizationStatus === AuthorizationStatus.Auth && (
                  <a className="btn film-card__button" onClick={handleAddReviewClick}>Add Review</a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs activeTab={activeTab as TTab} onTabClick={handleTabClick} film={film} />
            </div>

          </div>
        </div>
      </section>
      <div className="page-content">

        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmCardsList films={similarFilms} />
        </section>

        <Footer />
      </div>
    </>


  );
}

export default FilmScreen;

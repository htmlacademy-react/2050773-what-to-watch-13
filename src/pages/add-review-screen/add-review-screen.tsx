import Header from '../../components/header/header';
import {Helmet} from 'react-helmet-async';
import AddReview from '../../components/add-review/add-review';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch, useFilmFromLocation } from '../../hooks/index';
import { useEffect } from 'react';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { getFilm } from '../../store/films-data/films-data.selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function AddReviewScreen(): JSX.Element {
  const filmFromState = useFilmFromLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const selectedFilm = useAppSelector(getFilm);
  const film = filmFromState || selectedFilm;

  useEffect(() => {
    if (!filmFromState && id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch, filmFromState]);

  if(!film) {
    return <NotFoundScreen />;
  }


  return(
    <section className="film-card film-card--full" style={{background: film.backgroundColor}}>

      <Helmet>
        <title>WTW. Add review</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id as string}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>
      <AddReview id={id as string} />
    </section>
  );
}

export default AddReviewScreen;

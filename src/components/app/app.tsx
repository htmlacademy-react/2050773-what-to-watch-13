import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/index';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { getFilmsDataLoadingStatus } from '../../store/films-data/films-data.selectors';
import { getFilms } from '../../store/films-data/films-data.selectors';


type AppScreenProps = {
  genres: string[];
}


function App({ genres }: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const films = useAppSelector(getFilms);

  if (authorizationStatus === AuthorizationStatus.Unknown || isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  const recommendedFilms = films.slice(-4); //временный вариант


  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<WelcomeScreen genres={genres} filmsSmallCards={films} />}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignInScreen />}
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerScreen />}
          />
          <Route
            path={AppRoute.Film}
            element={<FilmScreen film={films[5]} films={recommendedFilms} />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyListScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute>
                <AddReviewScreen />
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>

  );
}

export default App;

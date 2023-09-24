import {Route, BrowserRouter, Routes} from 'react-router-dom';
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
// import { TFilms } from '../../types/films';
import { TReview } from '../../types/review';
import { useAppSelector } from '../../hooks/index';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppScreenProps = {
  // films: TFilms[];
  reviews: TReview[];
  genres: string[];
}


function App({ reviews, genres }: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const films = useAppSelector((state) => state.films);


  if (authorizationStatus === AuthorizationStatus.Unknown || isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  const recommendedFilms = films.slice(-4); //временный вариант


  return(
    <HelmetProvider>
      <BrowserRouter>
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
            element={<PlayerScreen film={films[0]} />}
          />
          <Route
            path={AppRoute.Film}
            element={<FilmScreen film={films[5]} reviews={reviews} films={recommendedFilms} />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewScreen film={films[3]} />
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>

  );
}

export default App;

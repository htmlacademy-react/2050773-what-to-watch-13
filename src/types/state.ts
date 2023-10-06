import { store } from '../store/index';
import { TFilm, TFilmSmallCards, TPromo } from './films';
import { TReviews, TReview } from './review';
import {AuthorizationStatus} from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type FilmsData = {
  films: TFilmSmallCards;
  isFilmsDataLoading: boolean;
  similarFilms: TFilmSmallCards;
  isSimilarFilmsDataLoading: boolean;
}

export type FilmsProcess = {
  genre: string;
  displayedFilmsCount: number;
}

export type FilmData = {
  film: TFilm | null;
  isFilmDataLoading: boolean;
  promo: TPromo | null;
  isPromoFilmDataLoading: boolean;
  reviews: TReviews;
  review: TReview | null;
}

export type State = ReturnType<typeof store.getState>; // псевдоним типа, равный структуре нашего хранилища

export type AppDispatch = typeof store.dispatch; // чтобы при диспатче мы получали информацию о типах, потом будем использовать с хуками, которые будут диспатчить наши действия.

export type LocationState = {
  film?: TFilm;
};

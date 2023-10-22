import { store } from '../store/index';
import { TFilm, TFilmSmallCards, TPromo } from './films';
import { TReviews, TReview } from './review';
import {AuthorizationStatus} from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  avatar: string;
};

export type FilmsData = {
  films: TFilmSmallCards;
  isFilmsDataLoading: boolean;
  similarFilms: TFilmSmallCards;
  isSimilarFilmsDataLoading: boolean;
  film: TFilm | null;
  isFilmDataLoading: boolean;
  promo: TPromo | null;
  isPromoFilmDataLoading: boolean;
  areFavoriteFilmsloading: boolean;
  favoriteFilms: TFilmSmallCards;
  isFavoriteStatusUploading: boolean;
  haveFilmsError: boolean;
  hasSimilarError: boolean;
  hasFilmCardError: boolean;
  hasFavoritesError: boolean;
  hasChangeStatusError: boolean;
}

export type Reviews = {
  reviews: TReviews;
  review: TReview | null;
  isReviewsLoading: boolean;
  hasReviewsError: boolean;
  isReviewSending: boolean;
  hasReviewSendingError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type LocationState = {
  film?: TFilm;
};

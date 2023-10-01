import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TFilm, TPromo } from '../../types/films';
import { TReview, TReviews } from '../../types/review';

export const getFilm = (state: State): TFilm | null => state[NameSpace.Film].film;
export const getPromo = (state: State): TPromo | null => state[NameSpace.Film].promo;
export const getReviews = (state: State): TReviews => state[NameSpace.Film].reviews;
export const sendReview = (state: State): TReview | null => state[NameSpace.Film].review;
export const isFilmDataLoading = (state: State): boolean => state[NameSpace.Film].isFilmDataLoading;
export const isPromoFilmDataLoading = (state: State): boolean => state[NameSpace.Film].isPromoFilmDataLoading;

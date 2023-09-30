import { createAction } from '@reduxjs/toolkit';
import { TFilmSmallCards, TFilm, TPromo } from '../types/films';
import { TReviews, TReview } from '../types/review';
import { AuthorizationStatus, AppRoute } from '../const';


export const changeGenre = createAction<{genre: string}>('changeGenre');
export const fillFilmsList = createAction<{films: TFilmSmallCards}>('fillFilmsList');
export const increaseDisplayFilmsCount = createAction('increaseDisplayFilmsCount');
export const resetDisplayFilmsCount = createAction('resetDisplayFilmsCount');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setFilmsDataLoadingStatus = createAction<boolean>('setFilmsDataLoadingStatus');
export const loadFilmById = createAction<{film: TFilm | null}>('loadFilmById');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
export const setFilmDataLoadingStatus = createAction<boolean>('setFilmDataLoadingStatus');
export const setPromoFilmDataLoadingStatus = createAction<boolean>('setPromoFilmDataLoadingStatus');
export const loadPromoFilm = createAction<{promo: TPromo | null}>('loadPromoFilm');
export const fillReviewsList = createAction<{reviews: TReviews}>('fillReviewsList');
export const setReviewsDataLoadingStatus = createAction<boolean>('setReviewsDataLoadingStatus');
export const sendComment = createAction<TReview>('sendComment');

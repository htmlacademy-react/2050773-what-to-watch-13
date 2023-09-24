import { createAction } from '@reduxjs/toolkit';
import { TFilmSmallCards, TFilm } from '../types/films';
import { AuthorizationStatus, AppRoute } from '../const';


export const changeGenre = createAction<{genre: string}>('changeGenre');
export const fillFilmsList = createAction<{films: TFilmSmallCards}>('fillFilmsList');
export const increaseDisplayFilmsCount = createAction('increaseDisplayFilmsCount');
export const resetDisplayFilmsCount = createAction('resetDisplayFilmsCount');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setFilmsDataLoadingStatus = createAction<boolean>('setFilmsDataLoadingStatus');
export const loadFilmById = createAction<{film: TFilm}>('loadFilmById');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');


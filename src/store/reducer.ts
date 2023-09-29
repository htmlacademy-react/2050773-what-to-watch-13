import { createReducer } from '@reduxjs/toolkit';
import { TFilmSmallCards, TFilm, TPromo } from '../types/films';
import { changeGenre, fillFilmsList, increaseDisplayFilmsCount, resetDisplayFilmsCount, requireAuthorization, setError, setFilmsDataLoadingStatus, loadFilmById, loadPromoFilm, setFilmDataLoadingStatus, setPromoFilmDataLoadingStatus } from './action';
import { DISPLAYED_FILMS_COUNT, AuthorizationStatus } from '../const';


const DEFAULT_GENRE = 'All genres';

type InitialStateType = {
  genre: string;
  films: TFilmSmallCards;
  displayedFilmsCount: number;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isFilmsDataLoading: boolean;
  isFilmDataLoading: boolean;
  isPromoFilmDataLoading: boolean;
  film: TFilm | null;
  promo: TPromo | null;
};

const InitialState: InitialStateType = {
  genre: DEFAULT_GENRE,
  films: [],
  displayedFilmsCount: DISPLAYED_FILMS_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isFilmsDataLoading: false,
  isFilmDataLoading: true,
  isPromoFilmDataLoading: true,
  film: null,
  promo: null
};

const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(fillFilmsList, (state, action) => {
      state.films = action.payload.films;
    })
    .addCase(loadFilmById, (state, action) => {
      state.film = action.payload.film;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(increaseDisplayFilmsCount, (state) => {
      state.displayedFilmsCount += DISPLAYED_FILMS_COUNT;
    })
    .addCase(resetDisplayFilmsCount, (state) => {
      state.displayedFilmsCount = DISPLAYED_FILMS_COUNT;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promo = action.payload.promo;
    })
    .addCase(setFilmDataLoadingStatus, (state, action) => {
      state.isFilmDataLoading = action.payload;
    })
    .addCase(setPromoFilmDataLoadingStatus, (state, action) => {
      state.isPromoFilmDataLoading = action.payload;
    });
});

export { reducer };

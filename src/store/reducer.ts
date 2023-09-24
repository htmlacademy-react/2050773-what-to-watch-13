import { createReducer } from '@reduxjs/toolkit';
import { TFilms } from '../types/films';
import { changeGenre, fillFilmsList, increaseDisplayFilmsCount, resetDisplayFilmsCount, requireAuthorization, setError } from './action';
import { DISPLAYED_FILMS_COUNT, AuthorizationStatus } from '../const';

const DEFAULT_GENRE = 'All genres';

type InitialStateType = {
  genre: string;
  films: TFilms;
  displayedFilmsCount: number;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const InitialState: InitialStateType = {
  genre: DEFAULT_GENRE,
  films: [],
  displayedFilmsCount: DISPLAYED_FILMS_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(fillFilmsList, (state, action) => {
      state.films = action.payload.films;
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
    });
});


export { reducer };

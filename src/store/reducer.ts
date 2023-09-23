import { createReducer } from '@reduxjs/toolkit';
import { TFilms } from '../types/films';
import { changeGenre, fillFilmsList, increaseDisplayFilmsCount, resetDisplayFilmsCount } from './action';
import { DISPLAYED_FILMS_COUNT } from '../const';

const DEFAULT_GENRE = 'All genres';

type InitialStateType = {
  genre: string;
  films: TFilms[];
  displayedFilmsCount: number;
};

const InitialState: InitialStateType = {
  genre: DEFAULT_GENRE,
  films: [],
  displayedFilmsCount: DISPLAYED_FILMS_COUNT,
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
    });
});

export { reducer };

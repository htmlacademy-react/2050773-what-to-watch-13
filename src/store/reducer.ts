import { createReducer } from '@reduxjs/toolkit';
import { TFilms } from '../types/films';
import { changeGenre, fillFilmsList } from './action';

const DEFAULT_GENRE = 'All genres';

type InitialStateType = {
  genre: string;
  films: TFilms[];
};

const InitialState: InitialStateType = {
  genre: DEFAULT_GENRE,
  films: [],
};

const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(fillFilmsList, (state, action) => {
      state.films = action.payload.films;
    });
});

export { reducer };

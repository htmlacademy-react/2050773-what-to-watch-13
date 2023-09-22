import { createAction } from '@reduxjs/toolkit';
import { TFilms } from '../types/films';

export const changeGenre = createAction<{genre: string}>('changeGenre');
export const fillFilmsList = createAction<{films: TFilms[]}>('fillFilmsList');

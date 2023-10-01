import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmData } from './film-data/film-data.slice';
import { filmsData } from './films-data/films-data.slice';
import { filmsProcess } from './films-process/films-process.slice';
import { userProcess } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.FilmsScreen]: filmsProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});

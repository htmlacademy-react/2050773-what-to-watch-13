import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmsData } from './films-data/films-data.slice';
import { userProcess } from './user-process/user-process.slice';
import { reviewsProcess } from './reviews-process/reviews-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer
});

import { random, system, internet } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { TFilmSmallCard } from '../types/films';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakeFilm = (): TFilmSmallCard => ({
  id: crypto.randomUUID(),
  name: random.words(),
  previewImage: system.filePath(),
  previewVideoLink: internet.url(),
  genre: random.word(),
});

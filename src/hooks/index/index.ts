import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch, LocationState } from '../../types/state';
import { useLocation } from 'react-router-dom';
import { TFilm } from '../../types/films';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useFilmFromLocation = (): TFilm | undefined => {
  const location = useLocation();
  return (location.state as LocationState)?.film;
};

import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TFilmSmallCards, TFilm, TPromo } from '../../types/films';


export const getFilms = (state: Pick <State, NameSpace.Films>): TFilmSmallCards => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: Pick <State, NameSpace.Films>): boolean => state[NameSpace.Films].isFilmsDataLoading;
export const getSimilarFilms = (state: State): TFilmSmallCards => state[NameSpace.Films].similarFilms;
export const getFilm = (state: State): TFilm | null => state[NameSpace.Films].film;
export const getFilmErrorStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].hasFilmCardError;
export const getPromo = (state: State): TPromo | null => state[NameSpace.Films].promo;
export const isFilmDataLoading = (state: State): boolean => state[NameSpace.Films].isFilmDataLoading;
export const getFavorites = (state: State): TFilmSmallCards => state[NameSpace.Films].favoriteFilms;
export const getFavoritesCount = (state: State): number => state[NameSpace.Films].favoriteFilms.length;

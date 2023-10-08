import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TFilmSmallCards, TFilm, TPromo } from '../../types/films';


export const getFilms = (state: State): TFilmSmallCards => state[NameSpace.Films].films;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isFilmsDataLoading;
export const getSimilarFilms = (state: State): TFilmSmallCards => state[NameSpace.Films].similarFilms;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Films].isSimilarFilmsDataLoading;
export const getFilm = (state: State): TFilm | null => state[NameSpace.Films].film;
export const getPromo = (state: State): TPromo | null => state[NameSpace.Films].promo;
export const isFilmDataLoading = (state: State): boolean => state[NameSpace.Films].isFilmDataLoading;
export const isPromoFilmDataLoading = (state: State): boolean => state[NameSpace.Films].isPromoFilmDataLoading;
export const getFavorites = (state: State): TFilmSmallCards => state[NameSpace.Films].favoriteFilms;
export const getFavoritesCount = (state: State): number => state[NameSpace.Films].favoriteFilms.length;

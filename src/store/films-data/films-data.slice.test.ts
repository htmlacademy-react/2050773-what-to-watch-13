import { makeFakeFilm } from '../../utils/mocks';
import { fetchFilmsAction } from '../api-actions';
import { filmsData } from './films-data.slice';

describe('filmsData Slice', () => {

  it('should handle an empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      films: [],
      isFilmsDataLoading: false,
      similarFilms: [],
      isSimilarFilmsDataLoading: false,
      isFilmDataLoading: true,
      isPromoFilmDataLoading: true,
      film: null,
      promo: null,
      areFavoriteFilmsloading: true,
      favoriteFilms: [],
      isFavoriteStatusUploading: true,
    };

    const result = filmsData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      films: [],
      isFilmsDataLoading: false,
      areFavoriteFilmsloading: true,
      favoriteFilms: [],
      film: null,
      isFavoriteStatusUploading: true,
      isFilmDataLoading: true,
      isPromoFilmDataLoading: true,
      isSimilarFilmsDataLoading: false,
      promo: null,
      similarFilms: [],
    };

    const result = filmsData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFilmsDataLoading" to "true", with "fetchFilmsAction.pending"', () => {
    const expectedState = {
      films: [],
      isFilmsDataLoading: true,
      areFavoriteFilmsloading: true,
      favoriteFilms: [],
      film: null,
      isFavoriteStatusUploading: true,
      isFilmDataLoading: true,
      isPromoFilmDataLoading: true,
      isSimilarFilmsDataLoading: false,
      promo: null,
      similarFilms: [],
    };

    const result = filmsData.reducer(undefined, fetchFilmsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "films" to array with film, "isFilmsDataLoading" to "false" with "fetchFilmsAction.fulfilled"', () => {
    const mockFilm = makeFakeFilm();
    const expectedState = {
      films: [mockFilm],
      isFilmsDataLoading: false,
      areFavoriteFilmsloading: true,
      favoriteFilms: [],
      film: null,
      isFavoriteStatusUploading: true,
      isFilmDataLoading: true,
      isPromoFilmDataLoading: true,
      isSimilarFilmsDataLoading: false,
      promo: null,
      similarFilms: [],
    };

    const result = filmsData.reducer(
      undefined,
      fetchFilmsAction.fulfilled([mockFilm], '', undefined)
    );
    expect(result).toEqual(expectedState);
  });
});

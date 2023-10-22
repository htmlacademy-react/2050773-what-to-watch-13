import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import { fetchFilmsAction, fetchFavoritesAction, fetchUploadFavoriteStatusAction,
  fetchSimilarFilmsAction, fetchFilmByIdAction, fetchPromoFilmAction } from '../api-actions';


const initialState: FilmsData = {
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
  haveFilmsError: false,
  hasSimilarError: false,
  hasFilmCardError: false,
  hasFavoritesError: false,
  hasChangeStatusError: false
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.haveFilmsError = false;
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
        state.haveFilmsError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.films = [];
        state.isFilmsDataLoading = false;
        state.haveFilmsError = true;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsDataLoading = true;
        state.hasSimilarError = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsDataLoading = false;
        state.hasSimilarError = false;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
        state.isSimilarFilmsDataLoading = false;
        state.hasSimilarError = true;
      })
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.isFilmDataLoading = true;
        state.hasFilmCardError = false;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.isFilmDataLoading = false;
        state.film = action.payload;
        state.hasFilmCardError = false;
      })
      .addCase(fetchFilmByIdAction.rejected, (state) => {
        state.isFilmDataLoading = false;
        state.hasFilmCardError = true;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmDataLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.isPromoFilmDataLoading = false;
        state.promo = action.payload;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.areFavoriteFilmsloading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.areFavoriteFilmsloading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoriteFilms = [];
        state.areFavoriteFilmsloading = false;
        state.hasFavoritesError = true;
      })
      .addCase(fetchUploadFavoriteStatusAction.pending, (state) => {
        state.isFavoriteStatusUploading = true;
      })
      .addCase(
        fetchUploadFavoriteStatusAction.fulfilled, (state, action) => {
          const {id, isFavorite} = action.payload;
          const updatedFilmIndex = state.films.findIndex((film) => film.id === id);
          const updatedFilmFavoritesIndex = state.favoriteFilms.findIndex((film) => film.id === id);

          if (state.film && state.film.id === id) {
            state.film.isFavorite = isFavorite;
          }

          if (state.promo && state.promo.id === id) {
            state.promo.isFavorite = isFavorite;
          }

          if (isFavorite) {
            state.favoriteFilms.push(state.films[updatedFilmIndex]);
          } else {
            state.favoriteFilms.splice(updatedFilmFavoritesIndex, 1);
          }

          state.isFavoriteStatusUploading = false;
        })
      .addCase(fetchUploadFavoriteStatusAction.rejected, (state) => {
        state.isFavoriteStatusUploading = false;
        state.hasChangeStatusError = true;
      });
  }
});

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
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.films = [];
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsDataLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
        state.isSimilarFilmsDataLoading = false;
      })
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.isFilmDataLoading = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.isFilmDataLoading = false;
        state.film = action.payload;
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
      });
  }
});

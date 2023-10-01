import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilmByIdAction, fetchPromoFilmAction, fetchReviewsAction, fetchSendCommentAction } from '../api-actions';

const initialState: FilmData = {
  isFilmDataLoading: true,
  isPromoFilmDataLoading: true,
  film: null,
  promo: null,
  reviews: [],
  review: null
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.review = action.payload;
      });
  }
});

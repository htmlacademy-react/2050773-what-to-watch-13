import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/state';
import { fetchReviewsAction, fetchSendCommentAction } from '../api-actions';

const initialState: Reviews = {
  reviews: [],
  review: null,
  isReviewsLoading: false,
  hasReviewsError: false,
  isReviewSending: false,
  hasReviewSendingError: false
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.hasReviewsError = false;
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.hasReviewsError = false;
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasReviewsError = true;
        state.isReviewsLoading = false;
      })
      .addCase(fetchSendCommentAction.pending, (state)=> {
        state.hasReviewSendingError = false;
        state.isReviewSending = true;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action)=> {
        state.hasReviewSendingError = false;
        state.isReviewSending = false;
        state.review = action.payload;

      })
      .addCase(fetchSendCommentAction.rejected, (state) => {
        state.hasReviewSendingError = true;
        state.isReviewSending = false;
      });
  }
});

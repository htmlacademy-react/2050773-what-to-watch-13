import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/state';
import { fetchReviewsAction, fetchSendCommentAction } from '../api-actions';

const initialState: Reviews = {
  reviews: [],
  review: null
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.review = action.payload;
      });
  }
});

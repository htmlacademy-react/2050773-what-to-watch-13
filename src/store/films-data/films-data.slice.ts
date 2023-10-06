import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmsData} from '../../types/state';
import {fetchFilmsAction} from '../api-actions';
import { fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmsData = {
  films: [],
  isFilmsDataLoading: false,
  similarFilms: [],
  isSimilarFilmsDataLoading: false,
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
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsDataLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsDataLoading = false;
      });
  }
});

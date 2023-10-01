import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmsData} from '../../types/state';
import {fetchFilmsAction} from '../api-actions';

const initialState: FilmsData = {
  films: [],
  isFilmsDataLoading: false,
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
      });
  }
});

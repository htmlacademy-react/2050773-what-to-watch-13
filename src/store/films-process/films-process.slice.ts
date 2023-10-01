import { FilmsProcess } from '../../types/state';
import { DEFAULT_GENRE, DISPLAYED_FILMS_COUNT, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilmsProcess = {
  genre: DEFAULT_GENRE,
  displayedFilmsCount: DISPLAYED_FILMS_COUNT,
};

export const filmsProcess = createSlice({
  name: NameSpace.FilmsScreen,
  initialState,
  reducers: {
    increaseDisplayFilmsCount: (state) => {
      state.displayedFilmsCount = state.displayedFilmsCount + DISPLAYED_FILMS_COUNT;
    },
    resetDisplayFilmsCount: (state) => {
      state.displayedFilmsCount = DISPLAYED_FILMS_COUNT;
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  }
});

export const { increaseDisplayFilmsCount, resetDisplayFilmsCount, changeGenre } = filmsProcess.actions;

import { App } from '../../types/state';
import { DEFAULT_GENRE, NameSpace } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: App = {
  genre: DEFAULT_GENRE,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  }
});

export const { changeGenre } = appProcess.actions;

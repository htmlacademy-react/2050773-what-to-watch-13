import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { TFilmSmallCards, TFilm, TPromo } from '../types/films.js';
import { fillFilmsList, requireAuthorization, setError, setFilmsDataLoadingStatus, loadFilmById, redirectToRoute, setFilmDataLoadingStatus, setPromoFilmDataLoadingStatus, loadPromoFilm, fillReviewsList } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './';
import { TReviews } from '../types/review.js';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<TFilmSmallCards>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(fillFilmsList({ films: data }));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<TReviews>(`${APIRoute.GetReviews}/${filmId}`);
    dispatch(fillReviewsList({ reviews: data }));
  },
);

export const fetchFilmByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmById',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TFilm>(`${APIRoute.Films}/${filmId}`);
      dispatch(loadFilmById({ film: data }));
      dispatch(setFilmDataLoadingStatus(false));
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      dispatch(setError('Failed to fetch the film by its ID.'));
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<TPromo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async(_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setFilmDataLoadingStatus(true)); // Start loading
      const {data} = await api.get<TPromo>(APIRoute.Promo);
      dispatch(loadPromoFilm({ promo: data }));
      dispatch(setPromoFilmDataLoadingStatus(false)); // End loading
      return data;
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      dispatch(setError('Failed to fetch promo film.'));
      throw error;// This is crucial to tell Redux Toolkit that the async thunk has failed.
    }
  }
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

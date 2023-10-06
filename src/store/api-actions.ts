import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { TFilmSmallCards, TFilm, TPromo } from '../types/films.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { TReviews, TReview } from '../types/review.js';


export const fetchFilmsAction = createAsyncThunk<TFilmSmallCards, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<TFilmSmallCards>(APIRoute.Films);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<TFilmSmallCards, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarFilms',
  async (filmId, { extra: api}) => {
    const {data} = await api.get<TFilmSmallCards>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<TReviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (filmId: string, { extra: api}) => {
    const response = await api.get<TReviews>(`${APIRoute.Comments}/${filmId}`);
    return response.data;
  }
);


export const fetchSendCommentAction = createAsyncThunk<TReview, {rating: number; comment: string; filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSendComment',
  async ({filmId, rating, comment}, {extra: api}) => {
    const { data } = await api.post<TReview>(`${APIRoute.Comments}/${filmId}`, {rating, comment});
    return(data);
  },
);

export const fetchFilmByIdAction = createAsyncThunk<TFilm, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmById',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<TFilm>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<TPromo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<TPromo>(APIRoute.Promo);
    return data;
  }
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
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
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

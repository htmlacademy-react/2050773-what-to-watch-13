import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { TFilmSmallCards, TFilm, TPromo, TFavoriteFilm } from '../types/films.js';
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
  async (filmId, { extra: api }) => {
    const {data} = await api.get<TFilmSmallCards>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<TFilmSmallCards, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorites',
  async (_arg, { extra: api }) => {
    const {data} = await api.get<TFilmSmallCards>(APIRoute.Favorite);
    return data;
  }
);

export const fetchUploadFavoriteStatusAction = createAsyncThunk<TFavoriteFilm, {status: number; id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ' fetchUploadFavoriteStatus',
  async({status, id}, {extra: api}) => {
    const {data} = await api.post<TFavoriteFilm>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<TReviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (filmId: string, { extra: api }) => {
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
  async ({filmId, rating, comment}, {dispatch, extra: api}) => {
    const { data } = await api.post<TReview>(`${APIRoute.Comments}/${filmId}`, {rating, comment});
    dispatch(redirectToRoute(AppRoute.Film.replace(':id', filmId) as AppRoute));
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


export const checkAuthAction = createAsyncThunk<UserData['avatarUrl'], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    const {data: {avatarUrl}} = await api.get<UserData>(APIRoute.Login);

    return avatarUrl;
  }
);

export const loginAction = createAsyncThunk<UserData['avatarUrl'], AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));

    return avatarUrl;
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

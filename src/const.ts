export enum AppRoute {
  Root = '/',
  MyList = '/mylist',
  SignIn = '/login',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum TABS {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews'
}

export const GENRES = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];

export const DISPLAYED_FILMS_COUNT = 8;

export enum APIRoute {
  Films = '/films',
  Favorite = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const BACKEND_URL = 'https://13.design.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export enum GenresNamespace {
  Comedies = 'Comedy',
  Crime = 'Crime',
  Dramas = 'Drama',
  Thrillers = 'Thriller',
}

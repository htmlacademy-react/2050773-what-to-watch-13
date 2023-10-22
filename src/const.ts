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

export const DISPLAYED_FILMS_COUNT = 8;

export enum APIRoute {
  Films = '/films',
  Favorite = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export const BACKEND_URL = 'https://13.design.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export enum NameSpace {
  Films = 'FILMS',
  User = 'USER',
  Reviews = 'REVIEWS'
}

export const DEFAULT_GENRE = 'All genres';

export const MAX_GENRES_COUNT = 9;

export const MAX_SIMILAR_FILMS_COUNT = 4;

export const ReviewLength = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};

export const DateFormat = {
  DATE_TIME_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM DD, YYYY',
};

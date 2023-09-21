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

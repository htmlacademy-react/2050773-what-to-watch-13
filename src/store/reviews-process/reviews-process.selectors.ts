import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TReviews } from '../../types/review';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].reviews;
export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewsLoading;
export const getReviewsErrorStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].hasReviewsError;
export const getReviewsSendingStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewSending;
export const getReviewsSendingErrorStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].hasReviewSendingError;

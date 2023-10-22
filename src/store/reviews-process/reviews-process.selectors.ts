import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TReviews } from '../../types/review';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].reviews;
export const getCommentsLoadingStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewsLoading;
export const getCommentsErrorStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].hasReviewsError;
export const getCommentSendingStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isReviewSending;
export const getCommentSendingErrorStatus = (state: Pick<State, NameSpace.Reviews>): boolean => state[NameSpace.Reviews].hasReviewSendingError;

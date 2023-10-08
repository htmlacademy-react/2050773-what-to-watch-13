import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TReview, TReviews } from '../../types/review';

export const getReviews = (state: State): TReviews => state[NameSpace.Reviews].reviews;
export const sendReview = (state: State): TReview | null => state[NameSpace.Reviews].review;

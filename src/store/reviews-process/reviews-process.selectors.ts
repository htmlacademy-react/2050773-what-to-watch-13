import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TReview, TReviews } from '../../types/review';

export const getReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].reviews;
export const sendReview = (state: State): TReview | null => state[NameSpace.Reviews].review;

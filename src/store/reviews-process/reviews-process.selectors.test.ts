import { NameSpace } from '../../const';
import { makeFakeReview } from '../../utils/mocks';
import { getReviews } from './reviews-process.selectors';
import { State } from '../../types/state';

describe('Reviews process selectors', () => {
  const mockReview = makeFakeReview();
  const state = {
    [NameSpace.Reviews]: {
      reviews: [mockReview],
      review: null,
    }
  } as unknown as Pick<State, NameSpace.Reviews>;

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });
});

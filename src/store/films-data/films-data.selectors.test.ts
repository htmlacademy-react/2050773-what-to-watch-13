import { NameSpace } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';
import { getFilms, getFilmsDataLoadingStatus } from './films-data.selectors';
import { State } from '../../types/state';

describe('FilmsData selectors', () => {
  const mockFilm = makeFakeFilm();
  const state = {
    [NameSpace.Films]: {
      films: [mockFilm],
      isFilmsDataLoading: true,
    }
  } as unknown as Pick<State, NameSpace.Films>;

  it('should return films from state', () => {
    const { films } = state[NameSpace.Films];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should return films data loading status', () => {
    const { isFilmsDataLoading } = state[NameSpace.Films];
    const result = getFilmsDataLoadingStatus(state);
    expect(result).toBe(isFilmsDataLoading);
  });
});

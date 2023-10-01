import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getGenre = (state: State): string => state[NameSpace.FilmsScreen].genre;
export const getDisplayedFilmsCount = (state: State): number => state[NameSpace.FilmsScreen].displayedFilmsCount;

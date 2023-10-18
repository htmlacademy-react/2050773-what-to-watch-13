import { TFilmSmallCards } from '../types/films';
import { DEFAULT_GENRE } from '../const';

export function getCurrentGenresList(films: TFilmSmallCards): string[] {
  const uniqueGenres = Array.from(new Set(films.map((film) => film.genre)));

  if (!uniqueGenres.includes(DEFAULT_GENRE)) {
    uniqueGenres.unshift(DEFAULT_GENRE);
  }

  return uniqueGenres.slice(0, 9);
}

export function getCurrentFilmsList(films: TFilmSmallCards, genre: string) {
  if (genre === DEFAULT_GENRE) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
}

export function isValidPassword(password: string): boolean {
  return /[A-Za-z]/.test(password) && /\d/.test(password);
}

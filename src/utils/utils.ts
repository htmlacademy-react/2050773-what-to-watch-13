import { TFilmSmallCards } from '../types/films';
import { DEFAULT_GENRE, MAX_GENRES_COUNT, ReviewLength } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


export function isValidPassword(password: string): boolean {
  return /[A-Za-z]/.test(password) && /\d/.test(password);
}

export const getGenres = (films: TFilmSmallCards) => {
  const genres = [DEFAULT_GENRE];
  const unicGenres = Array.from(new Set(films.map((film) => film.genre))).sort();
  return unicGenres.length <= MAX_GENRES_COUNT ? genres.concat(unicGenres) : genres.concat(unicGenres.slice(0, MAX_GENRES_COUNT));
};

export const getFilmsByGenre = (films: TFilmSmallCards, activeGenre: string) => (
  activeGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === activeGenre)
);

export function validateComment(comment: string) {
  return comment.length >= ReviewLength.MIN_LENGTH && comment.length <= ReviewLength.MAX_LENGTH;
}

function getDurationFormat(time: number) {
  return time < 10 ? `0${time}` : time;
}

export function getFormatRunTime(time: number) {
  const date = dayjs.duration(time, 'seconds');
  const hours = date.hours();
  const minutes = date.minutes();
  const seconds = date.seconds();

  return `-${hours !== 0 ? getDurationFormat(hours) : ''}:${getDurationFormat(minutes)}:${getDurationFormat(seconds)}`;
}

export function getDataFormat(data: string, format: string):string {
  return dayjs(data).format(format);
}

const BASE_DEGREE = 10;

const RenderPosition = {
  AFTERBEGIN: 'prepend',
  BEFOREEND: 'append',
  AFTEREND: 'after',
};

const DateConfig = {
  MAX_HOURS: 24,
  MAX_MINUTES: 60,
  DAYS_WEEK: 7,
  DAYS_YEARS: 365,
  DATE_OFFSET: 3600000,
};

const AppConfig = {
  MAX_FILMS_PER_STEP: 5,
  EXTRA_FILM_COUNT: 2,
  MAX_FILMS: 21,
  MAX_COMMENTS: 5,
  MAX_NUMBER_CHAR: 140,
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITES: 'favorites',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

export {
  BASE_DEGREE,
  RenderPosition,
  DateConfig,
  AppConfig,
  SortType,
  FilterType,
  UpdateType
};

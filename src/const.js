const SHOW_TIME = 5000;

const RenderPosition = {
  AFTERBEGIN: 'prepend',
  BEFOREEND: 'append',
  AFTEREND: 'after',
};

const DateFormat = {
  DATE: 'DD MMMM YYYY',
  TIME: 'H[h] mm[m]',
};

const AppConfig = {
  AUTHORIZATION: 'Basic Wdib32uK0Tj26ba',
  END_POINT: 'https://14.ecmascript.pages.academy/cinemaddict',
  STORE_PREFIX: 'cinemaddict-localstorage',
  STORE_VER: 'v1',
  MAX_FILMS_PER_STEP: 5,
  EXTRA_FILM_COUNT: 2,
  MAX_NUMBER_CHAR: 140,
  BAR_HEIGHT: 50,
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

const DatePeriod = {
  ALL: 'all',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export {
  SHOW_TIME,
  RenderPosition,
  DateFormat,
  AppConfig,
  SortType,
  FilterType,
  UpdateType,
  DatePeriod
};

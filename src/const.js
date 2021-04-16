const BASE_DEGREE = 10;

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const DateConfig = {
  MAX_HOURS: 24,
  MAX_MINUTES: 60,
  DAYS_WEEK: 7,
  DAYS_YEARS: 365,
  DATE_OFFSET: 3600000,
};

const AppConfig = {
  MAX_CARDS_SHOW: 5,
  EXTRA_CARD_COUNT: 2,
  MAX_CARDS: 21,
  MAX_COMMENTS: 5,
  MAX_NUMBER_CHAR: 140,
};

export {
  BASE_DEGREE,
  RenderPosition,
  DateConfig,
  AppConfig
};

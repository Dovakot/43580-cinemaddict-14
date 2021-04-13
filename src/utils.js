import {
  MAX_HOURS
} from 'const';

const DATE_OFFSET = 3600000;
const MAX_MINUTES = 60;
const BASE_DEGREE  = 10;

const Position = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const getElement = (string) => {
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(string);

  return documentFragment.firstElementChild;
};

const render = (container, element, place = Position.BEFOREEND) => {
  if (!element) return;

  if (typeof element === 'string') {
    container.insertAdjacentHTML(place, element);
  } else {
    container.insertAdjacentElement(place, element);
  }
};

const getRandomNumber = (min, max, maxInclusive = 0) => {
  const diff = Math.abs(max - min);

  return diff === 0 ? min : Math.random() * (diff + maxInclusive) + min;
};

const getRandomInt = (min, max) => {
  const randomNumber = getRandomNumber(min, max, 1);

  return Math.floor(randomNumber);
};

const getRandomFloat = (min, max, digits = 1) => {
  const randomNumber = getRandomNumber(min, max);
  const numberRank = BASE_DEGREE ** digits;

  return Math.ceil(randomNumber * numberRank) / numberRank;
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArrayIndex = (length) => new Array(length)
  .fill()
  .map(() => getRandomInt(0, length - 1));

const getRandomArray = (array, length) => new Array(length)
  .fill()
  .map(() => getRandomArrayElement(array));

const getRandomObjects = (generator, length) => new Array(length)
  .fill()
  .map(generator);

const getRandomDate = (days, hours = MAX_HOURS) => {
  const amountDays = DATE_OFFSET * hours * days;

  return Date.now() + amountDays;
};

const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).split(' ').join(' ');
};

const getFormattedDateTime = (date) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-CA', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).split('-').join('/');

  const formattedTime = new Date(date).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  }).split(' ').join(':');

  return `${formattedDate} ${formattedTime}`;
};

const getTimeFromMinutes = (amount) => {
  const hours = Math.trunc(amount / MAX_MINUTES);
  const minutes = amount % MAX_MINUTES;

  return `${hours}h ${minutes}m`;
};

const truncateText = (text, amount) => {
  return text.length > amount ? `${text.substring(0, amount)}...` : text;
};

export {
  Position,
  getElement,
  render,
  getRandomArrayIndex,
  getRandomArrayElement,
  getRandomArray,
  getRandomInt,
  getRandomFloat,
  getRandomDate,
  getFormattedDate,
  getFormattedDateTime,
  getTimeFromMinutes,
  getRandomObjects,
  truncateText
};

import {
  MAX_HOURS
} from 'const';

const DATE_OFFSET = 60 * 60 * 1000;

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

const replaceElement = (element, newElement) => {
  element.replaceWith(newElement);

  return newElement;
};

const render = (container, element, place = Position.BEFOREEND) => {
  if (typeof element === 'string') {
    container.insertAdjacentHTML(place, element);
  } else {
    container.insertAdjacentElement(place, element);
  }
};

const getRandomNumber = (min, max, maxInc = 0) => {
  const diff = max - min;

  if (diff < 0) {
    throw new Error(`Значение max(${max}) не должно быть меньше min(${min})`);
  }

  return (diff === 0) ? min : Math.random() * (diff + maxInc) + min;
};

const getRandomInt = (min, max) => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error(`Значения min(${min}) и max(${max}) должны быть целочисленными`);
  }

  const randomNumber = getRandomNumber(min, max, 1);

  return Math.floor(randomNumber);
};

const getRandomFloat = (min, max, digits = 1) => {
  const randomNumber = getRandomNumber(min, max);
  const numberRank = 10 ** digits;

  return Math.floor(randomNumber * numberRank) / numberRank;
};

const getRandomArrayIndex = (length) => {
  if (length < 0) {
    throw new Error(`Значение length(${length}) не должно быть отрицательным`);
  }

  const newArray = [];

  for (let counter = 0; counter < length; counter++) {
    const index = getRandomInt(0, length - 1);

    newArray.push(index);
  }

  return newArray;
};

const getRandomArrayElement = (array) => {
  const length = array.length - 1;
  const index = (length >= 0) ? getRandomInt(0, length) : 0;

  return array[index];
};

const getRandomArray = (array, amount = array.length) => {
  const length = array.length;

  if (amount > length || amount < 0) {
    throw new Error(`Значение amount(${amount}) не должно быть отрицательным и больше array.length(${length})`);
  }

  const newArray = [];

  for (let counter = 0; counter < amount; counter++) {
    const item = getRandomArrayElement(array);

    newArray.push(item);
  }

  return newArray;
};

const getRandomObjects = (generator, amount) => [...Array(amount)].map(() => generator());

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
  const hours = Math.trunc(amount / 60);
  const minutes = amount % 60;

  return `${hours}h ${minutes}m`;
};

const truncateText = (text, amount) => {
  return text.length > amount ? `${text.substring(0, amount)}...` : text;
};

export {
  Position,
  getElement,
  render,
  replaceElement,
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

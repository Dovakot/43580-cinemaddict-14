import {
  BASE_DEGREE,
  DateConfig
} from 'const';

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

const getRandomDate = (days) => {
  const amountDays = DateConfig.DATE_OFFSET * DateConfig.MAX_HOURS * days;

  return Date.now() + amountDays;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.filmInfo.id === update.filmInfo.id);

  if (index === -1) return items;

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomArrayElement,
  getRandomArrayIndex,
  getRandomArray,
  getRandomObjects,
  getRandomDate,
  isEscEvent,
  updateItem
};

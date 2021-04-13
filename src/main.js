/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  MAX_COMMENTS
} from 'const';

import {
  Position,
  getElement,
  render,
  getRandomObjects
} from 'utils';

import createUserLevelTemplate from 'view/user-level';
import createMenuTemplate from 'view/menu';
import createFiltersTemplate from 'view/filters';
import createSortTemplate from 'view/sorts';
import createShowButtonTemplate from 'view/show-button';
import createFilmsTemplate from 'view/films';
import createFilmsEmptyTemplate from 'view/films-empty';
import createFilmCardTemplate from 'view/film-card';
import createFooterStatisticsTemplate from 'view/footer-statistics';
import createFilmDetailsTemplate from 'view/film-details';

import {
  generateFilters,
  getFilterByRating,
  getFilterByComments
} from 'mock/filters';

import {
  getSortByRating,
  getSortByComments
} from 'mock/sorts';

import generateCard from 'mock/film-card';
import generateComment from 'mock/comment';

const AppConfig = {
  MAX_CARDS_SHOW: 5,
  EXTRA_CARD_COUNT: 2,
  MAX_CARDS: 21,
};

let shownCardCounter = 0;

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const cardData = getRandomObjects(generateCard, AppConfig.MAX_CARDS);
const cardCount = cardData.length;

const commentData = getRandomObjects(generateComment, MAX_COMMENTS);
const filterData = generateFilters(cardData);

const userHistory = filterData[1];
const userLevel = cardCount ? getElement(createUserLevelTemplate(userHistory)) : '';
render(containerHeader, userLevel);

const filters = createFiltersTemplate(filterData);
const menu = getElement(createMenuTemplate(filters));
render(containerMain, menu);

const sort = cardCount ? getElement(createSortTemplate()) : '';
render(containerMain, sort);

const footerStatistics = getElement(createFooterStatisticsTemplate(cardCount));
render(containerFooter, footerStatistics);

const films = cardCount ?
  getElement(createFilmsTemplate()) : getElement(createFilmsEmptyTemplate());

const baseFilmsList = films.querySelector('.films-list');
const filmsCardsContainer = baseFilmsList.querySelector('.films-list__container');

const topFilmsList = films.querySelector('.films-list--top');
const commentedFilmsList = films.querySelector('.films-list--commented');

const createFilmsCards = (cards) => cards.map(createFilmCardTemplate).join('');

const showCardsToContainer = () => {
  const shownCards = cardData
    .slice(shownCardCounter, shownCardCounter + AppConfig.MAX_CARDS_SHOW);

  shownCardCounter += AppConfig.MAX_CARDS_SHOW;

  render(filmsCardsContainer, createFilmsCards(shownCards));
};

const onShowButtonClick = (evt) => {
  evt.preventDefault();

  showCardsToContainer();

  if (shownCardCounter >= AppConfig.MAX_CARDS) {
    evt.target.remove();
  }
};

const renderTopFilmsCards = () => {
  const sortedByRating = getSortByRating(getFilterByRating(cardData));

  if (!sortedByRating.length) return topFilmsList.remove();

  const container = topFilmsList.querySelector('.films-list__container');
  const topFilms = sortedByRating.slice(0, AppConfig.EXTRA_CARD_COUNT);

  render(container, createFilmsCards(topFilms));
};

const renderCommentedFilmsCards = () => {
  const sortedByComments = getSortByComments(getFilterByComments(cardData));

  if (!sortedByComments.length) return commentedFilmsList.remove();

  const container = commentedFilmsList.querySelector('.films-list__container');
  const commentedFilms = sortedByComments.slice(0, AppConfig.EXTRA_CARD_COUNT);

  render(container, createFilmsCards(commentedFilms));
};

const renderFilmsCards = () => {
  if (!cardCount) return render(containerMain, films);

  const showButton = getElement(createShowButtonTemplate());
  const filmDetails = createFilmDetailsTemplate(cardData[0], commentData);

  showCardsToContainer();
  render(baseFilmsList, showButton);

  showButton.addEventListener('click', onShowButtonClick);

  renderTopFilmsCards();
  renderCommentedFilmsCards();

  render(containerMain, films);
  render(containerFooter, filmDetails, Position.AFTEREND);
};

renderFilmsCards();

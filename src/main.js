/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import {
  getRandomObjects,
  isEscEvent
} from 'utils/common';

import {
  render,
  remove
} from 'utils/render';

import UserLevelView from 'view/user-level';
import MenuView from 'view/menu';
import FilterView from 'view/filter';
import SortView from 'view/sort';
import ShowButtonView from 'view/show-button';
import FilmsView from 'view/films';
import FilmsEmptyView from 'view/films-empty';
import FilmCardView from 'view/film-card';
import FooterStatisticsView from 'view/footer-statistics';
import DetailsComponentView from 'view/film-details';

import {
  generateFilter,
  getFilterByRating,
  getFilterByComments
} from 'mock/filter';

import {
  getSortByRating,
  getSortByComments
} from 'mock/sort';

import generateCard from 'mock/film-card';
import generateComment from 'mock/comment';

let shownCardCounter = 0;
let filmDetails = null;

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const cardData = getRandomObjects(generateCard, AppConfig.MAX_CARDS);
const cardCount = cardData.length;

const commentData = getRandomObjects(generateComment, AppConfig.MAX_COMMENTS);
const filterData = generateFilter(cardData);

const filter = new FilterView(filterData).getTemplate();
render(containerMain, new MenuView(filter));

const films = cardCount ? new FilmsView().getElement() : new FilmsEmptyView();

if (cardCount) {
  const userHistory = filterData[1];

  render(containerHeader, new UserLevelView(userHistory));
  render(containerMain, new SortView());
  render(containerFooter, new FooterStatisticsView(cardCount));
}

const createFilmsCards = (cards) => {
  const cardFragment = document.createDocumentFragment();

  cards.forEach(createCard(cardFragment));

  return cardFragment;
};

const createCard = (cardFragment) => (card) => {
  const cardComponent = new FilmCardView(card);
  const detailsComponent = new DetailsComponentView(card, commentData);

  render(cardFragment, cardComponent);

  cardComponent.setClickHandler(filmCardClickHandler(detailsComponent));
};

const filmCardClickHandler = (detailsComponent) => () => {
  document.body.classList.add('hide-overflow');
  render(document.body, detailsComponent);

  filmDetails = detailsComponent;

  detailsComponent.setCloseClickHandler(closeButtonClickHandler);
  document.addEventListener('keydown', escKeyDownHandler);
};

const closeFilmDetails = () => {
  document.body.classList.remove('hide-overflow');
  remove(filmDetails);

  filmDetails = null;

  document.removeEventListener('keydown', escKeyDownHandler);
};

const closeButtonClickHandler = closeFilmDetails;

const escKeyDownHandler = (evt) => isEscEvent(evt) ? closeFilmDetails() : false;

const showCardsToContainer = (container) => {
  const shownCards = cardData
    .slice(shownCardCounter, shownCardCounter + AppConfig.MAX_CARDS_SHOW);

  shownCardCounter += AppConfig.MAX_CARDS_SHOW;

  render(container, createFilmsCards(shownCards));
};

const showButtonClickHandler = (showButtonComponent, container) => () => {
  showCardsToContainer(container);

  if (shownCardCounter >= AppConfig.MAX_CARDS) {
    remove(showButtonComponent);
  }
};

const renderTopFilmsCards = () => {
  const sortedByRating = getSortByRating(getFilterByRating(cardData));
  const filmsList = films.querySelector('.films-list--top');

  if (!sortedByRating.length) return filmsList.remove();

  const container = filmsList.querySelector('.films-list__container');
  const topFilms = sortedByRating.slice(0, AppConfig.EXTRA_CARD_COUNT);

  render(container, createFilmsCards(topFilms));
};

const renderCommentedFilmsCards = () => {
  const sortedByComments = getSortByComments(getFilterByComments(cardData));
  const filmsList = films.querySelector('.films-list--commented');

  if (!sortedByComments.length) return filmsList.remove();

  const container = filmsList.querySelector('.films-list__container');
  const commentedFilms = sortedByComments.slice(0, AppConfig.EXTRA_CARD_COUNT);

  render(container, createFilmsCards(commentedFilms));
};

const renderFilmsCards = () => {
  if (!cardCount) return render(containerMain, films);

  const showButtonComponent = new ShowButtonView();
  const filmsList = films.querySelector('.films-list');
  const container = filmsList.querySelector('.films-list__container');

  showCardsToContainer(container);
  render(filmsList, showButtonComponent);

  showButtonComponent.setClickHandler(
    showButtonClickHandler(showButtonComponent, container),
  );

  renderTopFilmsCards();
  renderCommentedFilmsCards();
  render(containerMain, films);
};

renderFilmsCards();

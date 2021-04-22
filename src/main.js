/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import {
  render,
  getRandomObjects,
  isEscEvent
} from 'utils';

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

const userHistory = filterData[1];
const userLevel = cardCount ? new UserLevelView(userHistory).getElement() : '';
render(containerHeader, userLevel);

const filter = new FilterView(filterData).getTemplate();
render(containerMain, new MenuView(filter).getElement());

const sort = cardCount ? new SortView().getElement() : '';
render(containerMain, sort);
render(containerFooter, new FooterStatisticsView(cardCount).getElement());

const films = cardCount ? new FilmsView().getElement() :
  new FilmsEmptyView().getElement();

const baseFilmsList = films.querySelector('.films-list');
const filmsCardsContainer = baseFilmsList.querySelector('.films-list__container');

const topFilmsList = films.querySelector('.films-list--top');
const commentedFilmsList = films.querySelector('.films-list--commented');

const createFilmsCards = (cards) => {
  const cardFragment = document.createDocumentFragment();

  cards.forEach(createCard(cardFragment));

  return cardFragment;
};

const createCard = (cardFragment) => (card) => {
  const cardComponent = new FilmCardView(card);
  const detailsComponent = new DetailsComponentView(card, commentData);

  render(cardFragment, cardComponent.getElement());

  cardComponent.setClickHandler(filmCardClickHandler(detailsComponent));
};

const filmCardClickHandler = (detailsComponent) => () => {
  document.body.classList.add('hide-overflow');
  render(document.body, detailsComponent.getElement());

  filmDetails = detailsComponent;

  detailsComponent.setCloseClickHandler(closeButtonClickHandler);
  document.addEventListener('keydown', escKeyDownHandler);
};

const closeFilmDetails = () => {
  document.body.classList.remove('hide-overflow');
  filmDetails.getElement().remove();
  filmDetails.removeElement();

  filmDetails = null;

  document.removeEventListener('keydown', escKeyDownHandler);
};

const closeButtonClickHandler = closeFilmDetails;

const escKeyDownHandler = (evt) => isEscEvent(evt) ? closeFilmDetails() : false;

const showCardsToContainer = () => {
  const shownCards = cardData
    .slice(shownCardCounter, shownCardCounter + AppConfig.MAX_CARDS_SHOW);

  shownCardCounter += AppConfig.MAX_CARDS_SHOW;

  render(filmsCardsContainer, createFilmsCards(shownCards));
};

const showButtonClickHandler = (showButtonComponent) => () => {
  showCardsToContainer();

  if (shownCardCounter >= AppConfig.MAX_CARDS) {
    showButtonComponent.getElement().remove();
    showButtonComponent.removeElement();
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

  const showButtonComponent = new ShowButtonView();

  showCardsToContainer();
  render(baseFilmsList, showButtonComponent.getElement());

  showButtonComponent.setClickHandler(showButtonClickHandler(showButtonComponent));

  renderTopFilmsCards();
  renderCommentedFilmsCards();
  render(containerMain, films);
};

renderFilmsCards();

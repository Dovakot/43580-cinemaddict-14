/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import {
  render,
  getRandomObjects
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

const TARGET_CLASS_LIST = [
  'film-card__poster',
  'film-card__title',
  'film-card__comments',
];

let shownCardCounter = 0;

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

  cardComponent.getElement()
    .addEventListener('click', onFilmCardClick(detailsComponent));
};

const onFilmCardClick = (detailsComponent) => (evt) => {
  evt.preventDefault();

  const target = evt.target;
  const checkClassName = (item) => !target.classList.contains(item);

  if (TARGET_CLASS_LIST.every(checkClassName)) return;

  document.body.classList.add('hide-overflow');
  render(document.body, detailsComponent.getElement());

  detailsComponent.getElement().querySelector('.film-details__close-btn')
    .addEventListener('click', onCloseButtonClick(detailsComponent));
};

const onCloseButtonClick = (detailsComponent) => (evt) => {
  evt.preventDefault();

  document.body.classList.remove('hide-overflow');
  detailsComponent.getElement().remove();
  detailsComponent.removeElement();
};

const showCardsToContainer = () => {
  const shownCards = cardData
    .slice(shownCardCounter, shownCardCounter + AppConfig.MAX_CARDS_SHOW);

  shownCardCounter += AppConfig.MAX_CARDS_SHOW;

  render(filmsCardsContainer, createFilmsCards(shownCards));
};

const onShowButtonClick = (showButtonComponent) => (evt) => {
  evt.preventDefault();

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

  showButtonComponent.getElement()
    .addEventListener('click', onShowButtonClick(showButtonComponent));

  renderTopFilmsCards();
  renderCommentedFilmsCards();
  render(containerMain, films);
};

renderFilmsCards();

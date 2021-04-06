/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  Position,
  getElement,
  render,
  replaceElement
} from 'utils';

import createUserLevelTemplate from 'view/user-level';
import createMenuTemplate from 'view/menu';
import createFiltersTemplate from 'view/filters';
import createSortTemplate from 'view/sorts';
import createShowButtonTemplate from 'view/show-button';
import createFilmsTemplate from 'view/films';
import createFilmCardTemplate from 'view/film-card';
import createFilmsListContainerTemplate from 'view/films-list-container';
import createFooterStatisticsTemplate from 'view/footer-statistics';
import createFilmDetailsTemplate from 'view/film-details';

const MAX_CARDS_LOAD = 5;
const AMOUNT_POPULAR_CARDS = 2;

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

let userLevel = getElement(createUserLevelTemplate());
render(containerHeader, userLevel);

let filters = createFiltersTemplate();
let menu = getElement(createMenuTemplate(filters));
render(containerMain, menu);

let sort = getElement(createSortTemplate());
render(containerMain, sort);

let footerStatistics = getElement(createFooterStatisticsTemplate());
render(containerFooter, footerStatistics);

let filmDetails = getElement(createFilmDetailsTemplate());
render(containerFooter, filmDetails, Position.AFTEREND);

let films = getElement(createFilmsTemplate());
let showButton = getElement(createShowButtonTemplate());

const createFilmCards = (amountCards) => {
  const filmsListContainer = getElement(createFilmsListContainerTemplate());

  for (let counter = 0; counter < amountCards; counter++) {
    const filmCard = getElement(createFilmCardTemplate());

    render(filmsListContainer, filmCard);
  }

  return filmsListContainer;
};

const renderFilmsLists = () => {
  const filmsLists = films.querySelectorAll('.films-list');

  filmsLists.forEach((list) => {
    if (list.classList.contains('films-list--extra')) {
      render(list, createFilmCards(AMOUNT_POPULAR_CARDS));
    } else {
      render(list, createFilmCards(MAX_CARDS_LOAD));
      render(list, showButton);
    }
  });

  render(containerMain, films);
};

renderFilmsLists();

if (module.hot) {
  module.hot.accept('view/user-level', () => {
    userLevel = replaceElement(
      userLevel,
      getElement(createUserLevelTemplate()),
    );
  });

  module.hot.accept([
    'view/menu',
    'view/filters',
  ], () => {
    filters = createFiltersTemplate();
    menu = replaceElement(
      menu,
      getElement(createMenuTemplate(filters)),
    );
  });

  module.hot.accept('view/sorts', () => {
    sort = replaceElement(
      sort,
      getElement(createSortTemplate()),
    );
  });

  module.hot.accept([
    'view/films',
    'view/film-card',
    'view/films-list-container',
  ], () => {
    films = replaceElement(
      films,
      getElement(createFilmsTemplate()),
    );
    renderFilmsLists();
  });

  module.hot.accept('view/show-button', () => {
    showButton = replaceElement(
      showButton,
      getElement(createShowButtonTemplate()),
    );
  });

  module.hot.accept('view/footer-statistics', () => {
    footerStatistics = replaceElement(
      footerStatistics,
      getElement(createFooterStatisticsTemplate()),
    );
  });

  module.hot.accept('view/film-details', () => {
    filmDetails = replaceElement(
      filmDetails,
      getElement(createFilmDetailsTemplate()),
    );
  });
}

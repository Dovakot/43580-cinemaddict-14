/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  MAX_COMMENTS
} from 'const';

import {
  Position,
  getElement,
  render,
  replaceElement,
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

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const cardData = getRandomObjects(generateCard, AppConfig.MAX_CARDS);
const cardCount = cardData.length;

const commentData = getRandomObjects(generateComment, MAX_COMMENTS);
const filtertData = generateFilters(cardData);

let userLevel = cardCount ? getElement(createUserLevelTemplate(filtertData[0])) : '';
render(containerHeader, userLevel);

let filters = createFiltersTemplate(filtertData);
let menu = getElement(createMenuTemplate(filters));
render(containerMain, menu);

let sort = cardCount ? getElement(createSortTemplate()) : '';
render(containerMain, sort);

let footerStatistics = getElement(createFooterStatisticsTemplate(cardCount));
render(containerFooter, footerStatistics);

let films = cardCount
  ? getElement(createFilmsTemplate())
  : getElement(createFilmsEmptyTemplate());

const renderFilmsCards = () => {
  if (!cardCount) {
    render(containerMain, films);

    return;
  }

  const [
    baseList,
    topList,
    commentedList,
  ] = films.querySelectorAll('.films-list');

  const createFilmsCards = (cards) => {
    const createdCards = cards.map((card) => createFilmCardTemplate(card)).join('');

    return createdCards;
  };

  const showFilmsCards = () => {
    const showButton = getElement(createShowButtonTemplate());
    const container = baseList.querySelector('.films-list__container');
    let shownCardCounter = 0;

    const addCardsToContainer = () => {
      const shownCards = cardData.slice(shownCardCounter, shownCardCounter + AppConfig.MAX_CARDS_SHOW);
      shownCardCounter += AppConfig.MAX_CARDS_SHOW;

      render(container, createFilmsCards(shownCards));
    };

    const onShowButtonClick = (evt) => {
      evt.preventDefault();

      addCardsToContainer();

      if (shownCardCounter >= AppConfig.MAX_CARDS) {
        showButton.remove();
      }
    };

    addCardsToContainer();
    render(baseList, showButton);

    showButton.addEventListener('click', onShowButtonClick);
  };

  const showTopFilmsCards = () => {
    const sortedByRating = getSortByRating(getFilterByRating(cardData));

    if (!sortedByRating.length) {
      topList.remove();

      return;
    }

    const container = topList.querySelector('.films-list__container');
    const topFilms = sortedByRating.slice(0, AppConfig.EXTRA_CARD_COUNT);

    render(
      container,
      createFilmsCards(topFilms),
    );
  };

  const showCommentedFilmsCards = () => {
    const sortedByComments = getSortByComments(getFilterByComments(cardData));

    if (!sortedByComments.length) {
      commentedList.remove();

      return;
    }

    const container = commentedList.querySelector('.films-list__container');
    const commentedFilms = sortedByComments.slice(0, AppConfig.EXTRA_CARD_COUNT);

    render(
      container,
      createFilmsCards(commentedFilms),
    );
  };

  showFilmsCards();
  showTopFilmsCards();
  showCommentedFilmsCards();

  render(containerMain, films);
  render(
    containerFooter,
    createFilmDetailsTemplate(cardData[0], commentData),
    Position.AFTEREND,
  );
};

renderFilmsCards();

if (module.hot) {
  module.hot.accept('view/user-level', () => {
    userLevel = cardCount ? replaceElement(
      userLevel,
      getElement(createUserLevelTemplate(filtertData[0])),
    ) : '';
  });

  module.hot.accept([
    'view/menu',
    'view/filters',
  ], () => {
    filters = createFiltersTemplate(cardData);
    menu = replaceElement(
      menu,
      getElement(createMenuTemplate(filters)),
    );
  });

  module.hot.accept('view/sorts', () => {
    sort = cardCount ? replaceElement(
      sort,
      getElement(createSortTemplate()),
    ) : '';
  });

  module.hot.accept([
    'view/films',
    'view/film-card',
    'view/show-button',
    'view/film-details',
    'view/films-empty',
  ], () => {
    if (!cardCount) {
      return;
    }

    films = replaceElement(
      films,
      getElement(createFilmsTemplate()),
    );
    renderFilmsCards();
  });

  module.hot.accept('view/footer-statistics', () => {
    footerStatistics = replaceElement(
      footerStatistics,
      getElement(createFooterStatisticsTemplate(cardCount)),
    );
  });
}

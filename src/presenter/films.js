import {
  AppConfig
} from 'const';

import {
  render,
  remove
} from 'utils/render';

import SortView from 'view/sort';
import ShowButtonView from 'view/show-button';
import FilmsView from 'view/films';
import FilmsEmptyView from 'view/films-empty';

import FilmCardPresenter from 'presenter/film-card.js';

import {
  getFilterByRating,
  getFilterByComments
} from 'mock/filter';

import {
  getSortByRating,
  getSortByComments
} from 'mock/sort';

class Films {
  constructor(containerMain) {
    this._containerMain = containerMain;
    this._renderedCardCounter = AppConfig.MAX_CARDS_PER_STEP;
    this._createdCardBox = null;

    this._sortComponent = new SortView();
    this._filmsEmptyComponent = new FilmsEmptyView();
    this._showButtonComponent = new ShowButtonView();

    this._filmsSection = new FilmsView().getElement();
    this._filmsListSection = this._filmsSection.querySelector('.films-list');
    this._filmsListContainer = this._filmsListSection.querySelector('.films-list__container');

    this._showButtonClickHandler = this._showButtonClickHandler.bind(this);
  }

  init(cards, comments) {
    this._cards = cards.slice();
    this._comments = comments;
    this._cardCount = cards.length;

    this._renderFilmsSections();
  }

  _renderSort() {
    render(this._containerMain, this._sortComponent);
  }

  _createCard(card) {
    const cardPresenter = new FilmCardPresenter(this._createdCardBox);
    cardPresenter.init(card, this._comments);
  }

  _createCards(cards) {
    this._createdCardBox = document.createDocumentFragment();

    cards.forEach((card) => this._createCard(card));
  }

  _renderCards(container, from, to) {
    this._createCards(this._cards.slice(from, to));
    render(container, this._createdCardBox);

    this._createdCardBox = null;
  }

  _showButtonClickHandler() {
    const maxCards = this._renderedCardCounter + AppConfig.MAX_CARDS_PER_STEP;

    this._renderCards(this._filmsListContainer, this._renderedCardCounter, maxCards);
    this._renderedCardCounter = maxCards;

    if (this._renderedCardCounter >= this._cardCount) {
      remove(this._showButtonComponent);
    }
  }

  _renderShowButton() {
    render(this._filmsListSection, this._showButtonComponent);

    this._showButtonComponent.setClickHandler(this._showButtonClickHandler);
  }

  _renderCardList() {
    this._renderCards(this._filmsListContainer, 0, this._renderedCardCounter);

    if (this._cardCount > this._renderedCardCounter) {
      this._renderShowButton();
    }
  }

  _renderExtraCardList(sortedCards, modifier) {
    const filmsListSection = this._filmsSection.querySelector(`.films-list--${modifier}`);

    if (!sortedCards.length) return filmsListSection.remove();

    const filmsListContainer = filmsListSection.querySelector('.films-list__container');
    this._renderCards(filmsListContainer, 0, AppConfig.EXTRA_CARD_COUNT);
  }

  _renderFilmsEmptySections() {
    render(this._containerMain, this._filmsEmptyComponent);
  }

  _renderFilmsSections() {
    if (!this._cardCount) return this._renderFilmsEmptySections();

    const sortedByRating = getSortByRating(getFilterByRating(this._cards));
    const sortedByComments = getSortByComments(getFilterByComments(this._cards));

    this._renderSort();
    this._renderCardList();
    this._renderExtraCardList(sortedByRating, 'top');
    this._renderExtraCardList(sortedByComments, 'commented');

    render(this._containerMain, this._filmsSection);
  }
}

export default Films;

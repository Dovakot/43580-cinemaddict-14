import {
  AppConfig,
  SortType
} from 'const';

import {
  render,
  remove
} from 'utils/render';

import SortView from 'view/sort';
import ShowButtonView from 'view/show-button';
import FilmsView from 'view/films';
import FilmsEmptyView from 'view/films-empty';

import FilmfilmCardPresenter from 'presenter/film-card';

class Films {
  constructor(containerMain, filmsModel) {
    this._filmsModel = filmsModel;
    this._containerMain = containerMain;
    this._renderedCardCounter = AppConfig.MAX_CARDS_PER_STEP;
    this._createdCardBox = null;
    this._filmCardPresenter = new Map();
    this._cardCount = null;
    this._currentSort = SortType.DEFAULT;

    this._sortComponent = null;

    this._filmsEmptyComponent = new FilmsEmptyView();
    this._showButtonComponent = new ShowButtonView();

    this._filmsSection = new FilmsView().getElement();
    this._filmListSection = this._filmsSection.querySelector('.films-list');
    this._filmListContainer = this._filmListSection.querySelector('.films-list__container');

    this._showButtonClickHandler = this._showButtonClickHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._filmCardChangeHandler = this._filmCardChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  init() {
    this._cardCount = this._getCards().length;

    this._renderFilmsSections();
  }

  _getCards() {
    return this._filmsModel.sortBy(this._currentSort) || this._filmsModel.getFilms();
  }

  _createFilmCard(card) {
    const filmCardPresenter = new FilmfilmCardPresenter(
      this._createdCardBox, this._modeChangeHandler, this._filmCardChangeHandler,
    );
    filmCardPresenter.init(card, this._filmsModel.getComments());

    this._filmCardPresenter.set(filmCardPresenter, card.filmInfo.id);
  }

  _createFilmsCards(cards) {
    this._createdCardBox = document.createDocumentFragment();

    cards.forEach((card) => this._createFilmCard(card));
  }

  _renderFilmsCards(cards, container, from, to) {
    this._createFilmsCards(cards.slice(from, to));
    render(container, this._createdCardBox);
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSort);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);

    render(this._containerMain, this._sortComponent);
  }

  _renderShowButton() {
    render(this._filmListSection, this._showButtonComponent);

    this._showButtonComponent.setClickHandler(this._showButtonClickHandler);
  }

  _renderFilmCardList() {
    this._renderFilmsCards(
      this._getCards(), this._filmListContainer, 0, this._renderedCardCounter,
    );

    if (this._cardCount > this._renderedCardCounter) {
      this._renderShowButton();
    }
  }

  _renderExtraFilmCardList(sortedCards, modifier) {
    const filmsListSection = this._filmsSection.querySelector(`.films-list--${modifier}`);

    if (!sortedCards.length) return filmsListSection.remove();

    const filmsListContainer = filmsListSection.querySelector('.films-list__container');
    this._renderFilmsCards(sortedCards, filmsListContainer, 0, AppConfig.EXTRA_CARD_COUNT);
  }

  _renderFilmsEmptySections() {
    render(this._containerMain, this._filmsEmptyComponent);
  }

  _renderFilmsSections() {
    if (!this._cardCount) return this._renderFilmsEmptySections();

    this._renderSort();
    this._renderFilmCardList();
    this._renderExtraFilmCardList(this._filmsModel.sortByRating(), 'top');
    this._renderExtraFilmCardList(this._filmsModel.sortByComments(), 'commented');

    render(this._containerMain, this._filmsSection);
  }

  _clearFilmsSections() {
    this._filmCardPresenter.forEach((id, presenter) => presenter.destroy());

    remove(this._sortComponent);
    remove(this._showButtonComponent);

    this._filmCardPresenter.clear();
  }

  _showButtonClickHandler() {
    const maxCards = this._renderedCardCounter + AppConfig.MAX_CARDS_PER_STEP;

    this._renderFilmsCards(
      this._getCards(), this._filmListContainer, this._renderedCardCounter, maxCards,
    );
    this._renderedCardCounter = maxCards;

    if (this._renderedCardCounter >= this._cardCount) {
      remove(this._showButtonComponent);
    }
  }

  _filmCardChangeHandler(updatedCard) {
    const updateFilmCard = (id, component) => {
      if (id === updatedCard.filmInfo.id) {
        component.init(updatedCard, this._filmsModel.getComments());
      }
    };

    this._filmsModel.updateFilm(updatedCard);
    this._filmCardPresenter.forEach(updateFilmCard);
  }

  _modeChangeHandler() {
    this._filmCardPresenter.forEach((id, presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSort === sortType) return;

    this._currentSort = sortType;

    this._clearFilmsSections();
    this._renderFilmsSections();
  }
}

export default Films;

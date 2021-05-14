import {
  AppConfig,
  SortType
} from 'const';

import {
  render,
  remove
} from 'utils/render-util';

import SortView from 'view/sort-view';
import ShowButtonView from 'view/show-button-view';
import FilmsView from 'view/films-view';
import FilmsEmptyView from 'view/films-empty-view';

import FilmCardPresenter from 'presenter/film-card-presenter';

const FilmsType = {
  TOP: 'top',
  COMMENTED: 'commented',
};

class FilmsPresenter {
  constructor(containerMain, filmsModel, commentsModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._containerMain = containerMain;
    this._renderedFilmCardCounter = AppConfig.MAX_FILMS_PER_STEP;
    this._createdFilmCardBox = null;
    this._filmCardPresenter = new Map();
    this._filmCardCount = null;
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
    this._filmCardCount = this._filmsModel.length;

    this._renderFilmsSections();
  }

  _getFilms() {
    return this._filmsModel.sortBy(this._currentSort);
  }

  _createFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(
      this._createdFilmCardBox, this._modeChangeHandler, this._filmCardChangeHandler,
    );
    filmCardPresenter.init(film, this._commentsModel.comments);

    this._filmCardPresenter.set(filmCardPresenter, film.filmInfo.id);
  }

  _createFilmsCards(films) {
    this._createdFilmCardBox = document.createDocumentFragment();

    films.forEach(this._createFilmCard, this);
  }

  _renderFilmsCards(films, container, from, to) {
    const newFilms = films.slice(from, to);

    this._createFilmsCards(newFilms);
    render(container, this._createdFilmCardBox);
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
      this._getFilms(), this._filmListContainer, 0, this._renderedFilmCardCounter,
    );

    if (this._filmCardCount > this._renderedFilmCardCounter) this._renderShowButton();
  }

  _renderExtraFilmCardList(type) {
    const filmsListSection = this._filmsSection.querySelector(`.films-list--${type}`);
    const films = this._filmsModel.getExtraFilms(type);

    if (!films) return filmsListSection.remove();

    const filmsListContainer = filmsListSection.querySelector('.films-list__container');
    this._renderFilmsCards(films, filmsListContainer, 0, AppConfig.EXTRA_FILM_COUNT);
  }

  _renderFilmsEmptySections() {
    render(this._containerMain, this._filmsEmptyComponent);
  }

  _renderFilmsSections() {
    if (!this._filmCardCount) return this._renderFilmsEmptySections();

    this._renderSort();
    this._renderFilmCardList();
    this._renderExtraFilmCardList(FilmsType.TOP);
    this._renderExtraFilmCardList(FilmsType.COMMENTED);

    render(this._containerMain, this._filmsSection);
  }

  _clearFilmsSections() {
    this._filmCardPresenter.forEach((id, presenter) => presenter.destroy());
    remove(this._sortComponent);

    this._filmCardPresenter.clear();
  }

  _showButtonClickHandler() {
    const maxFilms = this._renderedFilmCardCounter + AppConfig.MAX_FILMS_PER_STEP;

    this._renderFilmsCards(
      this._getFilms(), this._filmListContainer, this._renderedFilmCardCounter, maxFilms,
    );
    this._renderedFilmCardCounter = maxFilms;

    if (this._renderedFilmCardCounter >= this._filmCardCount) remove(this._showButtonComponent);
  }

  _filmCardChangeHandler(updated) {
    const updateFilmCard = (id, component) => id === updated.filmInfo.id
      && component.init(updated, this._commentsModel.comments);

    this._filmsModel.updateFilm(updated);
    this._filmCardPresenter.forEach(updateFilmCard);
  }

  _modeChangeHandler() {
    this._filmCardPresenter.forEach((id, presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSort === sortType) return;

    this._currentSort = sortType;
    this._renderedFilmCardCounter = AppConfig.MAX_FILMS_PER_STEP;

    this._clearFilmsSections();
    this._renderFilmsSections();
  }
}

export default FilmsPresenter;

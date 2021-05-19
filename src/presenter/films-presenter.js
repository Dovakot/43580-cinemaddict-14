import {
  AppConfig,
  SortType,
  UpdateType
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
  ALL: 'all',
  TOP: 'top',
  COMMENTED: 'commented',
};

const updateMethod = {
  patch: '_updatePatch',
  minor: '_updateMinor',
  major: '_updateMajor',
};

class FilmsPresenter {
  constructor(containerMain, filmsModel, commentsModel, menuModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._menuModel = menuModel;
    this._containerMain = containerMain;
    this._renderedFilmCardCounter = AppConfig.MAX_FILMS_PER_STEP;
    this._createdFilmCardBox = null;
    this._filmCardPresenter = new Map();
    this._deletedFilmCardPresenter = {};
    this._filmCardCount = null;
    this._currentSort = SortType.DEFAULT;
    this._filmType = FilmsType.ALL;

    this._sortComponent = null;
    this._filmsEmptyComponent = new FilmsEmptyView();
    this._showButtonComponent = new ShowButtonView();
    this._filmsSection = new FilmsView().getElement();
    this._filmListSection = this._filmsSection.querySelector('.films-list');
    this._filmListContainer = this._filmListSection.querySelector('.films-list__container');

    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._showButtonClickHandler = this._showButtonClickHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._filmsModel.addObserver(this._modelEventHandler);
    this._menuModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._filmCardCount = this._filmsModel.length;
    this._renderFilmsSections();
  }

  _getFilms() {
    const filteredFilms = this._filmsModel.filterBy(this._menuModel.filter);
    this._filmCardCount = filteredFilms.length;

    return this._filmsModel.sortBy(filteredFilms, this._currentSort);
  }

  _createFilmCard(film) {
    const id = film.filmInfo.id;
    const oldFilmCardPresenter = this._deletedFilmCardPresenter[this._filmType]
      && this._deletedFilmCardPresenter.id === id ? this._deletedFilmCardPresenter.presenter : null;

    const filmCardPresenter = oldFilmCardPresenter || new FilmCardPresenter(
      this._createdFilmCardBox, this._modeChangeHandler, this._viewActionHandler, this._commentsModel,
    );

    if (oldFilmCardPresenter) {
      oldFilmCardPresenter.rerender(this._createdFilmCardBox, film);
      this._deletedFilmCardPresenter = {};
    } else {
      filmCardPresenter.init(film);
    }

    this._filmCardPresenter.set(filmCardPresenter, {id, type: this._filmType});
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
    remove(this._sortComponent);

    this._sortComponent = new SortView(this._currentSort);
    render(this._containerMain, this._sortComponent);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderShowButton() {
    render(this._filmListSection, this._showButtonComponent);

    this._showButtonComponent.setClickHandler(this._showButtonClickHandler);
  }

  _renderFilmCardList() {
    this._filmType = FilmsType.ALL;

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
    this._filmType = type;

    this._renderFilmsCards(films, filmsListContainer, 0, AppConfig.EXTRA_FILM_COUNT);
  }

  _renderAllFilmsLists() {
    this._renderFilmCardList();
    this._renderExtraFilmCardList(FilmsType.TOP);
    this._renderExtraFilmCardList(FilmsType.COMMENTED);
  }

  _renderFilmsEmptySections() {
    render(this._containerMain, this._filmsEmptyComponent);
  }

  _renderFilmsSections() {
    if (!this._filmCardCount) return this._renderFilmsEmptySections();

    this._renderSort();
    this._renderAllFilmsLists();

    render(this._containerMain, this._filmsSection);
  }

  _clearFilmsSections(data) {
    const deleteCardFilm = ({id, type}, presenter) => {
      if (!presenter.defaultMode) {
        presenter.updateFilmDetailsPresenter(data);
        this._deletedFilmCardPresenter = {id, presenter, [type]: type};
      }

      presenter.destroy();
    };

    this._filmCardPresenter.forEach(deleteCardFilm);
    this._filmCardPresenter.clear();

    remove(this._showButtonComponent);
  }

  _showButtonClickHandler() {
    const maxFilms = this._renderedFilmCardCounter + AppConfig.MAX_FILMS_PER_STEP;

    this._renderFilmsCards(
      this._getFilms(), this._filmListContainer, this._renderedFilmCardCounter, maxFilms,
    );
    this._renderedFilmCardCounter = maxFilms;

    if (this._renderedFilmCardCounter >= this._filmCardCount) remove(this._showButtonComponent);
  }

  _updateFilmCardPresenter(updated) {
    this._filmCardPresenter.forEach(({id}, presenter) => id === updated.filmInfo.id
      && presenter.init(updated));
  }

  _updateFilmSection() {
    this._clearFilmsSections();
    this._renderFilmsSections();
  }

  _updatePatch(data) {
    this._updateFilmCardPresenter(data);
  }

  _updateMinor(data) {
    this._clearFilmsSections(data);
    this._renderAllFilmsLists();
  }

  _updateMajor() {
    this._currentSort = SortType.DEFAULT;
    this._renderedFilmCardCounter = AppConfig.MAX_FILMS_PER_STEP;
    this._filmCardCount = this._filmsModel.length;

    this._updateFilmSection();
  }

  _modeChangeHandler() {
    if (this._deletedFilmCardPresenter.presenter) {
      this._deletedFilmCardPresenter.presenter.resetView();
      this._deletedFilmCardPresenter = {};
    }

    this._filmCardPresenter.forEach((id, presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSort === sortType) return;

    this._currentSort = sortType;
    this._renderedFilmCardCounter = AppConfig.MAX_FILMS_PER_STEP;

    this._clearFilmsSections();
    this._renderFilmsSections();
  }

  _viewActionHandler(updateType, update) {
    if (this._menuModel.filter !== 'all') {
      updateType = UpdateType.MINOR;
    }

    this._filmsModel.updateFilm(updateType, update);
  }

  _modelEventHandler(updateType, data) {
    const method = updateMethod[updateType];
    this[method](data);
  }
}

export default FilmsPresenter;

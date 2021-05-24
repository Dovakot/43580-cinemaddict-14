import {
  render,
  remove,
  replace
} from 'utils/render-util';

import FilmCardView from 'view/film-card-view';

import AbstractFilmPresenter from './abstract-film-presenter';
import FilmDetailsPresenter from 'presenter/film-details-presenter';

const TARGET_CLASS_LIST = [
  'film-card__poster',
  'film-card__title',
  'film-card__comments',
];

class FilmCardPresenter extends AbstractFilmPresenter {
  constructor(filmCardBox, changeMode, changeData) {
    super();
    this._filmCardBox = filmCardBox;
    this._filmCardComponent = null;
    this._prevFilmCardComponent = null;
    this._filmDetailsPresenter = null;
    this._isDefaultMode = true;

    this._changeMode = changeMode;
    this._changeData = changeData;

    this._сlickHandler = this._сlickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    if (!this._isDefaultMode) this._filmDetailsPresenter.init(film);
    this._renderFilmCard();
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (!this._isDefaultMode) this._removeFilmDetails();
  }

  rerender(filmCardBox, film) {
    this._filmCardComponent = null;
    this._filmCardBox = filmCardBox;
    this.init(film);
  }

  updateFilmDetailsPresenter(film) {
    this._filmDetailsPresenter.init(film);
  }

  get defaultMode() {
    return this._isDefaultMode;
  }

  _createFilmCard() {
    this._prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setClickHandler(this._сlickHandler);
  }

  _replaceFilmCard() {
    replace(this._filmCardComponent, this._prevFilmCardComponent);

    remove(this._prevFilmCardComponent);
    this._prevFilmCardComponent = null;
  }

  _renderFilmCard() {
    this._createFilmCard();

    return this._prevFilmCardComponent ? this._replaceFilmCard()
      : render(this._filmCardBox, this._filmCardComponent);
  }

  _renderFilmDetails() {
    if (this._filmDetailsPresenter) return;

    this._filmDetailsPresenter = new FilmDetailsPresenter(this._changeMode, this._changeData);
    this._filmDetailsPresenter.init(this._film);

    this._changeMode();
    this._isDefaultMode = false;
  }

  _removeFilmDetails() {
    this._isDefaultMode = true;
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
  }

  _controlsClickHandler(target) {
    if (target.classList.contains('film-card__controls-item')) this.changeFilmStatus(target);
  }

  _сlickHandler({target}) {
    return TARGET_CLASS_LIST.some((item) => target.classList.contains(item))
      ? this._renderFilmDetails()
      : this._controlsClickHandler(target);
  }
}

export default FilmCardPresenter;

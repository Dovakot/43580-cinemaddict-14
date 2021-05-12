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
    this._filmDetailsPresenter = null;
    this._isDefaultMode = true;

    this._changeMode = changeMode;
    this._changeData = changeData;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setClickHandler(this._filmCardClickHandler);

    if (!prevFilmCardComponent) return render(this._filmCardBox, this._filmCardComponent);

    if (this._isDefaultMode) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    } else {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._filmDetailsPresenter.init(this._film);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (!this._isDefaultMode) this._removeFilmDetails();
  }

  _renderFilmDetails() {
    if (this._filmDetailsPresenter) return;

    this._filmDetailsPresenter = new FilmDetailsPresenter(this._changeMode, this._changeData);
    this._filmDetailsPresenter.init(this._film, this._comments);

    this._changeMode();
    this._isDefaultMode = false;
  }

  _removeFilmDetails() {
    this._isDefaultMode = true;
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
  }

  _filmCardClickHandler(evt) {
    const target = evt.target;
    const checkClassName = (item) => target.classList.contains(item);

    if (TARGET_CLASS_LIST.some(checkClassName)) return this._renderFilmDetails();
    if (target.classList.contains('film-card__controls-item')) return this._changeFilmStatus(target);
  }
}

export default FilmCardPresenter;

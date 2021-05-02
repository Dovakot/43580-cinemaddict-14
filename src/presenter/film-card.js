import {
  render,
  remove,
  replace
} from 'utils/render';

import AbstractPresenter from './abstract';
import FilmCardView from 'view/film-card';
import FilmDetailsPresenter from 'presenter/film-details.js';

const TARGET_CLASS_LIST = [
  'film-card__poster',
  'film-card__title',
  'film-card__comments',
];

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

class FilmCard extends AbstractPresenter {
  constructor(cardsContainer, changeMode, changeData) {
    super();
    this._cardsContainer = cardsContainer;
    this._filmCardComponent = null;
    this._mode = Mode.DEFAULT;
    this._filmDetailsPresenter = null;

    this._changeMode = changeMode;
    this._changeData = changeData;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  init(card, comments) {
    this._card = card;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(card);

    this._filmCardComponent.setClickHandler(this._filmCardClickHandler);

    if (!prevFilmCardComponent) return render(this._cardsContainer, this._filmCardComponent);

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    } else {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._filmDetailsPresenter.init(this._card, this._comments);
    }

    remove(prevFilmCardComponent);
  }

  resetView() {
    if (this._mode == Mode.DETAILS) this._removeFilmDetails();
  }

  _renderFilmDetails() {
    if (this._filmDetailsPresenter) return;

    this._filmDetailsPresenter = new FilmDetailsPresenter(this._changeMode, this._changeData);
    this._filmDetailsPresenter.init(this._card, this._comments);

    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _removeFilmDetails() {
    this._mode = Mode.DEFAULT;
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

export default FilmCard;

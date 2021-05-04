import {
  isEscEvent
} from 'utils/common';

import {
  render,
  remove,
  replace
} from 'utils/render';

import AbstractFilmPresenter from './abstract-film';
import DetailsComponentView from 'view/film-details';

class FilmDetails extends AbstractFilmPresenter {
  constructor(changeMode, changeData) {
    super();
    this._filmDetailsComponent = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsClickHandler = this._filmDetailsClickHandler.bind(this);
    this._filmDetailsChangeHandler = this._filmDetailsChangeHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(card, comments) {
    this._card = card;
    this._comments = comments;

    const prevFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new DetailsComponentView(card, comments);

    if (prevFilmDetailsComponent) {
      this._replaceFilmDetails(prevFilmDetailsComponent);
      remove(prevFilmDetailsComponent);
    } else {
      this._openFilmDetails();
    }

    this._filmDetailsComponent.setCloseClickHandler(this._filmDetailsClickHandler);
    this._filmDetailsComponent.setFormChangeHandler(this._filmDetailsChangeHandler);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _replaceFilmDetails(prevComponent) {
    const scroll = prevComponent.getElement().scrollTop;

    replace(this._filmDetailsComponent, prevComponent);
    this._filmDetailsComponent.getElement().scrollTop = scroll;
  }

  _closeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    this._changeMode();

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _openFilmDetails() {
    document.body.classList.add('hide-overflow');
    render(document.body, this._filmDetailsComponent);
  }

  _escKeyDownHandler(evt) {
    return isEscEvent(evt) ? this._closeFilmDetails() : false;
  }

  _filmDetailsClickHandler() {
    this._closeFilmDetails();
  }

  _filmDetailsChangeHandler(evt) {
    this._changeFilmStatus(evt.target);
  }
}

export default FilmDetails;

import {
  isEscEvent
} from 'utils/common';

import {
  render,
  remove
} from 'utils/render';

import FilmCardView from 'view/film-card';
import DetailsComponentView from 'view/film-details';

class FilmCard {
  constructor(cardListContainer) {
    this._cardListContainer = cardListContainer;

    this._cardComponent = null;
    this._detailsComponent = null;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(cards, comments) {
    this._cards = cards;
    this._comments = comments;

    this._cardComponent = new FilmCardView(cards);
    this._detailsComponent = new DetailsComponentView(cards, comments);

    render(this._cardListContainer, this._cardComponent);
    this._cardComponent.setClickHandler(this._filmCardClickHandler);
  }

  _closeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    remove(this._detailsComponent);

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _filmCardClickHandler() {
    document.body.classList.add('hide-overflow');
    render(document.body, this._detailsComponent);

    this._detailsComponent.setCloseClickHandler(this._closeButtonClickHandler);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    return isEscEvent(evt) ? this._closeFilmDetails() : false;
  }

  _closeButtonClickHandler() {
    this._closeFilmDetails();
  }
}

export default FilmCard;

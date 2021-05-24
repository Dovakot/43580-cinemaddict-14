import {
  UpdateType
} from 'const';

import {
  isEscEvent
} from 'utils/common-util';

import {
  render,
  remove
} from 'utils/render-util';

import CommentsModel from 'model/comments-model';

import DetailsComponentView from 'view/film-details/film-details-view';
import FilmDetailsControlsView from 'view/film-details/film-details-controls-view';

import AbstractFilmPresenter from './abstract-film-presenter';
import CommentsPresenter from 'presenter/comments-presenter';

class FilmDetailsPresenter extends AbstractFilmPresenter {
  constructor(changeMode, changeData, api) {
    super();
    this._controlsContainer = null;
    this._commentsContainer = null;
    this._filmDetailsComponent = null;
    this._filmControlsComponent = null;
    this._commentsPresenter = null;
    this._api = api;
    this._commentsModel = new CommentsModel();

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._keyHandler = this._keyHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._updateComments = this._updateComments.bind(this);

    this._commentsModel.addObserver(this._modelEventHandler);
  }

  init(film) {
    this._film = film;

    return this._filmDetailsComponent
      ? this._renderFilmControls() : this._openFilmDetails();
  }

  destroy() {
    remove(this._filmDetailsComponent);

    this._commentsModel.removeObserver(this._modelEventHandler);
  }

  _createFilmDetails() {
    this._filmDetailsComponent = new DetailsComponentView(this._film.filmInfo, {
      closeClick: this._closeClickHandler,
      formChange: this._changeHandler,
      formSubmit: this._submitHandler,
    });

    this._commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__bottom-container');
  }

  _renderFilmDetails() {
    this._controlsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__top-container');

    this._renderFilmControls();
    this._renderFilmComments(true);
    render(document.body, this._filmDetailsComponent);

    this._api.getComments(this._film.filmInfo.id)
      .then(this._updateComments)
      .catch(this._updateComments);
  }

  _renderFilmControls() {
    remove(this._filmControlsComponent);

    this._filmControlsComponent = new FilmDetailsControlsView(this._film.userDetails);
    render(this._controlsContainer, this._filmControlsComponent);
  }

  _renderFilmComments(isLoading) {
    this._commentsPresenter = new CommentsPresenter(
      isLoading, this._commentsContainer, this._commentsModel, this._film.comments,
    );
    this._commentsPresenter.init();
  }

  _updateComments(comments) {
    const isArray = Array.isArray(comments);

    this._commentsModel.init(isArray ? comments : []);
    this._commentsPresenter.destroy();
    this._renderFilmComments();

    if (isArray) this._filmDetailsComponent.setKeyHandler(this._keyHandler);
  }

  _openFilmDetails() {
    document.body.classList.add('hide-overflow');

    this._createFilmDetails();
    this._renderFilmDetails();

    this._filmDetailsComponent.setHandlers();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    this._changeMode();
    this.destroy();

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    return isEscEvent(evt) ? this._closeFilmDetails() : false;
  }

  _closeClickHandler() {
    this._closeFilmDetails();
  }

  _changeHandler({target}) {
    return target.classList.contains('film-details__control-input')
      ? this.changeFilmStatus(target) : this._commentsPresenter.changeComments(target);

  }

  _keyHandler() {
    const comment = this._commentsPresenter.getComment();

    if (comment) {
      this._commentsModel.addComment(UpdateType.MINOR, comment);
    }
  }

  _modelEventHandler(updateType, data, isDeleted) {
    this.changeFilmComment(updateType, data, isDeleted);
    this._commentsPresenter.rerenderComments(this._film.comments, isDeleted);
  }

  _submitHandler() {
    // отменяет отправление формы по Enter
    // возможно понадобиться в будушем, если нет, то реализация переедет во вьюху
  }
}

export default FilmDetailsPresenter;

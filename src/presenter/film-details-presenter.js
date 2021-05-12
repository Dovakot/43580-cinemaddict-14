import {
  isEscEvent
} from 'utils/common-util';

import {
  render,
  remove,
  replace
} from 'utils/render-util';

import DetailsComponentView from 'view/film-details/film-details-view';
import FilmDetailsControlsView from 'view/film-details/film-details-controls-view';

import AbstractFilmPresenter from './abstract-film-presenter';
import CommentsPresenter from 'presenter/comments-presenter';

class FilmDetailsPresenter extends AbstractFilmPresenter {
  constructor(changeMode, changeData) {
    super();
    this._filmDetailsComponent = null;
    this._filmControlsComponent = null;
    this._commentsPresenter = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsClickHandler = this._filmDetailsClickHandler.bind(this);
    this._filmDetailsChangeHandler = this._filmDetailsChangeHandler.bind(this);
    this._filmDetailsFormSubmitHandler = this._filmDetailsFormSubmitHandler.bind(this);
    this._commentsFieldSubmitHandler = this._commentsFieldSubmitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    if (this._filmDetailsComponent) {
      this._replaceFilmControls();
    } else {
      this._renderFilmDetails();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _replaceFilmControls() {
    const prevControlsComponent = this._filmControlsComponent;

    this._filmControlsComponent = new FilmDetailsControlsView(this._film.userDetails);
    replace(this._filmControlsComponent, prevControlsComponent);
  }

  _closeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    this._changeMode();

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _renderFilmDetails() {
    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent = new DetailsComponentView(this._film.filmInfo);
    this._renderFilmControls();
    this._renderFilmComments();
    render(document.body, this._filmDetailsComponent);

    this._filmDetailsComponent.setCloseClickHandler(this._filmDetailsClickHandler);
    this._filmDetailsComponent.setFormChangeHandler(this._filmDetailsChangeHandler);
    this._filmDetailsComponent.setFormSubmitHandler(this._filmDetailsFormSubmitHandler);
    this._filmDetailsComponent.setCommentsFieldKeydownHandler(this._commentsFieldSubmitHandler);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _renderFilmControls() {
    const controlsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__top-container');

    this._filmControlsComponent = new FilmDetailsControlsView(this._film.userDetails);
    render(controlsContainer, this._filmControlsComponent);
  }

  _renderFilmComments() {
    const commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__bottom-container');

    this._commentsPresenter = new CommentsPresenter(commentsContainer);
    this._commentsPresenter.init(this._film.comments, this._comments);
  }

  _escKeyDownHandler(evt) {
    return isEscEvent(evt) ? this._closeFilmDetails() : false;
  }

  _filmDetailsClickHandler() {
    this._closeFilmDetails();
  }

  _filmDetailsChangeHandler({target}) {
    return target.classList.contains('film-details__control-input')
      ? this._changeFilmStatus(target) : this._commentsPresenter.changeComments(target);

  }

  _commentsFieldSubmitHandler() {
    // получает данные после нажатия Ctrl/Command + Enter
    // console.log(this._commentsPresenter.getComment())
  }

  _filmDetailsFormSubmitHandler() {
    // отменяет отправление формы по Enter
    // возможно понадобиться в будушем, если нет, то реализация переедет во вьюху
  }
}

export default FilmDetailsPresenter;
